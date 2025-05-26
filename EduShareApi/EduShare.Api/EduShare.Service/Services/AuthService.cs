//using AutoMapper;
//using Castle.Core.Configuration;
//using Duende.IdentityModel.OidcClient;
//using EduShare.Core.DTOs;
//using EduShare.Core.Entities;
//using EduShare.Core.IRepositories;
//using EduShare.Core.IServices;
//using Microsoft.IdentityModel.Tokens;
//using System;
//using System.Collections.Generic;
//using System.IdentityModel.Tokens.Jwt;
//using System.Linq;
//using System.Security.Claims;
//using System.Text;
//using System.Threading.Tasks;


//namespace EduShare.Service.Services
//{
//    public class AuthService:IAuthService
//    {

//        private readonly IRepositoryManager _repositoryManager;
//        private readonly IMapper _mapper;
//        private readonly IConfiguration _configuration;

//        public AuthService(IRepositoryManager repositoryManager)
//        {
//            _repositoryManager= repositoryManager;
//        }
//        //public async Task<UserLoginResponse?> LoginAsync(UserDto userLogin)
//        //{
//        //    var user = await _repositoryManager.Users.GetUserByEmailAsync(userLogin.Email);
//        //    if (user == null)
//        //        return null;

//        //    if (user.Password != userLogin.Password)
//        //        return null;

//        //    string token = GenerateJwtToken(userLogin.Password, userLogin.Password, [userLogin.Role]);
//        //    // כאן תוכל לייצר טוקן אם יש צורך
//        //    //  string token = GenerateToken(user); // פונקציה ליצירת טוקן

//        //    return new UserLoginResponse
//        //    {
//        //        Id = user.Id,
//        //        //Token = token
//        //    };
//        //}
//        //public async Task<User> ValidateUserAsync(string email, string password)
//        //{
//        //    return await _repositoryManager.Users.ValidateUserAsync(email, password);
//        //}

//        //public string GenerateJwtToken(UserDto user)
//        //{
//        //    var claims = new List<Claim>()
//        //{
//        //    new Claim(ClaimTypes.Name, user.FullName),
//        //    new Claim(ClaimTypes.Role, user.Role)
//        //};

//        //    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("JWT:Key")));
//        //    var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
//        //    var tokeOptions = new JwtSecurityToken(
//        //        issuer: _configuration.GetValue<string>("JWT:Issuer"),
//        //        audience: _configuration.GetValue<string>("JWT:Audience"),
//        //        claims: claims,
//        //        expires: DateTime.Now.AddMinutes(6),
//        //        signingCredentials: signinCredentials
//        //    );

//        //    return new JwtSecurityTokenHandler().WriteToken(tokeOptions);
//        //}

//    }
//}
