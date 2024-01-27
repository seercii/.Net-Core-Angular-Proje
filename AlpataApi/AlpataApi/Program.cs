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
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JWTSettings"));//jwtsettings �zelliklerini kullanmak �c�n yazd�k

builder.Services.AddAuthentication(opt =>//burda kimlik dogrulama i�lemleri var 
{
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>//jwt ile ilgili detaylar var
{
    var jwtSettings = builder.Services.BuildServiceProvider().GetService<IOptions<JwtSettings>>().Value;

    options.TokenValidationParameters = new TokenValidationParameters//jwt nin dogruluguna bak�l�r
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

builder.Services.AddScoped<JwtHandler>();//jwthandler s�nf��n�n uygulama boyunca b�r kere olusturulup paylas�lmas�n� saglar jwt olusturma ve i�leme i�lemi



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

//cors u ekledik farkl� originde olmas�n diye
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
//resim i�in staticfiles ekledik
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
           Path.Combine(builder.Environment.ContentRootPath, "images")),
    RequestPath = "/images"
});
app.Run();
