using AlpataApi.Core.Entities;
using AlpataApi.Core.Models;
using AlpataApi.Data.Context;
using Microsoft.AspNetCore.Http;
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
        public async Task<ActionResult<Register>> CreateUser(RegisterModel register)
        {

            var user = new Register { Name = register.Name,
            Password = register.Password,
            Email = register.Email,
            Phone = register.Phone,
            SurName = register.SurName,
            PhotoImage=register.PhotoImage,
            };
            _context.Registers.Add(user);
            await _context.SaveChangesAsync();
            return Ok(new { Message = "Kullanıcı başarıyla eklendi." });

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, RegisterModel register)
        {
            var user = await _context.Registers.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            user.Name = register.Name;
            user.Password = register.Password;
            user.Email = register.Email;
            user.Phone = register.Phone;
            user.SurName = register.SurName;
            user.PhotoImage = register.PhotoImage;

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

            // Şifreyi kontrol et
            if (user.Password == login.Password)
            {
                // Başarılı giriş
                // Token oluşturmadan kullanıcıyı giriş yapmış kabul edebilirsiniz
                return Ok(new { Message = "Giriş başarılı." });
            }
            else
            {
                return Unauthorized(); // Şifre yanlış
            }
        }



    }
}
