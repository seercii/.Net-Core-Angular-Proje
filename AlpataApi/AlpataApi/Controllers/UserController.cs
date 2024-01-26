using AlpataApi.Core.Entities;
using AlpataApi.Core.Models;
using AlpataApi.Data.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AlpataApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AlpataApiContext _context;

        public UserController(AlpataApiContext context)
        {
            _context = context;
        }

        
        [HttpGet]
        public async Task<ActionResult<Register>> GetUsers()
        {
            var user= await _context.Registers.ToListAsync();
            return Ok(user);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Register>> GetUser(int id)
        {
            var user = await _context.Registers.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost]
        public async Task<ActionResult<Register>> CreateUser([FromForm]RegisterModel register) //fromform kullanmamızınsebebi 415 desteklenmeyen medya türü hatası dönmesi
        {

            //resim ekleme işlemi 
            if (register.PhotoImageFile != null) //yüklediği fotoğraf null mu değil mi
            {
                string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "images"); //fotoğrafı nereye yükleyeceğimizi seçeriz
                string uniqueFileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(register.PhotoImageFile.FileName); //burada yüklenen fotoğrafa karışık isim verir
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);//burda tam yolu belirliyoruz fotografın klasor ile foto 

                using (var fileStream = new FileStream(filePath, FileMode.Create)) //buda dosya yoksa olusturuyo 
                {
                    await register.PhotoImageFile.CopyToAsync(fileStream); //fotoyu fileStream üzerine asenkron olarak kopyalar
                }

                register.PhotoImage = uniqueFileName; //veritabanında adı saklar
            }

            var user = new Register
            {
                Name = register.Name,
                Password = register.Password,
                Email = register.Email,
                Phone = register.Phone,
                SurName = register.SurName,
                PhotoImage= register.PhotoImage,
            };
            var passwordHasher = new PasswordHasher<Register>(); //asp.net core identity frameworkü sayesinde passwordu passwordHasher sınıfının hashpassword metodu ile karma hale getirdik yani hash yaptık
            user.Password = passwordHasher.HashPassword(user, register.Password); //user şifreyi şifrelenecek olan kullanıcıyı temsil ediyor 
                                                                                  //register.passwordte şifrelencek olan şifreyi temsil ediyo. 
            _context.Registers.Add(user);                                         
            await _context.SaveChangesAsync();
            return Ok(new { Message = "Kullanıcı başarıyla eklendi." });
             
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromForm] RegisterModel register)
        {
            var user = await _context.Registers.FindAsync(id);
            if (register.PhotoImageFile != null)
            {
                string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "images");
                string uniqueFileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(register.PhotoImageFile.FileName);
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await register.PhotoImageFile.CopyToAsync(fileStream);
                }

                register.PhotoImage = uniqueFileName;
            }

            if (user == null)
            {
                return NotFound();
            }

            user.Name = register.Name;
            user.Password = register.Password;
            user.Email = register.Email;
            user.Phone = register.Phone;
            user.SurName = register.SurName;

            if (!string.IsNullOrWhiteSpace(register.Password))//register.Password değeri boş ve null değilse bu bloğa girer ve biz şifreyi girdikten sonra şifreyi karmaşıklaştırır
            {
                var passwordHasher = new PasswordHasher<Register>();
                user.Password = passwordHasher.HashPassword(user, register.Password);
            }
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Kullanıcı başarıyla güncellendi." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Registers.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            _context.Registers.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Kullanıcı başarıyla silindi." });
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login(Login login)
        {
            // Kullanıcıyı e-posta ile bul
            var user = await _context.Registers.SingleOrDefaultAsync(u => u.Email == login.Email);

            if (user == null)
            {
                return Unauthorized(); // Kullanıcı bulunamadı
            }


            var passwordHasher = new PasswordHasher<Register>();
            //ilk passwordhasher örneği olusturuyoruz daha sonra verifyhashedpassword ile giriş yapılan şifreyi database'deki şifreyle aynı mı değilmi ona bakıyoruz
            if (passwordHasher.VerifyHashedPassword(user, user.Password, login.Password) == PasswordVerificationResult.Success)
            {//user zaten giriş yapmaya çalısan kullanıcı user.password databasedeki karmaşık şifre login.passwordda girilen şifre eşleşiyosa ok eşleşmiyosa unauthorized
                return Ok(new { Message = "Giriş başarılı." });
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}