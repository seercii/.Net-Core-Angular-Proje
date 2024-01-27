using AlpataApi.Core.Entities;
using AlpataApi.Core.Models;
using AlpataApi.Data.Context;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using ZeniumChargeApi.JwtFeatures;

var builder = WebApplication.CreateBuilder(args);

//db contexti ekledik
builder.Services.AddScoped<AlpataApiContext>();


//jwt tokennn
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JWTSettings"));//jwtsettings özelliklerini kullanmak ýcýn yazdýk

builder.Services.AddAuthentication(opt =>//burda kimlik dogrulama iþlemleri var 
{
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>//jwt ile ilgili detaylar var
{
    var jwtSettings = builder.Services.BuildServiceProvider().GetService<IOptions<JwtSettings>>().Value;

    options.TokenValidationParameters = new TokenValidationParameters//jwt nin dogruluguna bakýlýr
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ClockSkew = TimeSpan.Zero,
        ValidIssuer = jwtSettings.ValidIssuer,
        ValidAudience = jwtSettings.ValidAudience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.SecurityKey))
    };
});

builder.Services.AddScoped<JwtHandler>();//jwthandler sýnfýýnýn uygulama boyunca býr kere olusturulup paylasýlmasýný saglar jwt olusturma ve iþleme iþlemi



builder.Services.AddControllers();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//cors u ekledik farklý originde olmasýn diye
app.UseCors(options =>
{
    options.AllowAnyOrigin();
    options.AllowAnyMethod();
    options.AllowAnyHeader();

});

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();
//resim için staticfiles ekledik
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
           Path.Combine(builder.Environment.ContentRootPath, "images")),
    RequestPath = "/images"
});
app.Run();
