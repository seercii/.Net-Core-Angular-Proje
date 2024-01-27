using AlpataApi.Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ZeniumChargeApi.JwtFeatures
{
    public class JwtHandler
    {
        private readonly IConfiguration _configuration;
        private readonly IConfigurationSection _jwtSettings;

        public JwtHandler(IConfiguration configuration) //yapıcı metodları olusturduk jwtsettings ve ıconfiguration kullanmak ıcın
        {
            _configuration = configuration;
            _jwtSettings = _configuration.GetSection("JwtSettings");
        }

        public SigningCredentials GetSigningCredentials()
        {
            var key = Encoding.UTF8.GetBytes(_jwtSettings.GetSection("securityKey").Value);//burda securitykeyi appsettingjsondan alıyoruz byte a çeviriyoruz
            var secret = new SymmetricSecurityKey(key);//bu key i kullanarak yeni key olusturuyoruz

            return new SigningCredentials(secret, SecurityAlgorithms.HmacSha256);//signingcredentials nesnesini olusturuyoruz
        }

        public List<Claim> GetClaims(Register user)//register sınfından gelen kullanıcıyı kullanıp jwt içinde tasıncak talepleri içeren liste olusturur
        {
            var claims = new List<Claim> //jwt nin taleplerini içercek
            {
                new Claim(ClaimTypes.Name, user.Email)//kullanıcının ismini temsil ediyor kullanıcının emailini içeriyor
            };

            return claims;//claims nesnesi claims listesine eklenıyo yani taleplere kullanıcı emaili eklenıyo  
        }

        public JwtSecurityToken GenerateTokenOptions(SigningCredentials signingCredentials, List<Claim> claims)
        {//jwt nin ayarları var jwtsecuritytokenı olusturur 
            var tokenOptions = new JwtSecurityToken(//yeni jwtsecuritytoken olusturur
                issuer: _jwtSettings["validIssuer"],//bu değerleri appsettingjsondan alıyoruz
                audience: _jwtSettings["validAudience"],
                claims: claims,//kullanıcı kimlik dogrulama
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(_jwtSettings["expiryInMinutes"])),//token süresi
                signingCredentials: signingCredentials);

            return tokenOptions;
        }
    }
}
