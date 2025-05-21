using AutoMapper;
using DotNetEnv;
using EduShare.Core.DTOs;
using EduShare.Core.Entities;
using EduShare.Core.IRepositories;
using EduShare.Core.IServices;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace EduShare.Service.Services
{
    public class UserService : IUserService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        //private readonly IConfiguration _configuration;

        public UserService(IRepositoryManager repositoryManager, IMapper mapper,IConfiguration configuration)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            //_configuration = configuration;
            Env.Load();
        }

        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            var users = await _repositoryManager.Users.GetAllAsync();
            return _mapper.Map<IEnumerable<UserDto>>(users);
        }

        public async Task<UserDto?> GetUserByIdAsync(int id)
        {
            var user = await _repositoryManager.Users.GetByIdAsync(id);
            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> CreateUserAsync(UserDto userObj)
        {
            var existingUser = await _repositoryManager.Users.GetByIdAsync((int)userObj.Id);
            if (existingUser == null)
            {
                var userEntity = _mapper.Map<User>(userObj);
                await _repositoryManager.Users.CreateAsync(userEntity);
                await _repositoryManager.SaveAsync();
                return _mapper.Map<UserDto>(userEntity);
            }
            return null;
        }

        //public async Task<bool> UpdateUserAsync(int id, UserDto userObj)
        //{
        //    var existingUser = await _repositoryManager.Users.GetByIdAsync((int)id);
        //    if (existingUser != null)
        //    {
        //        var userEntity = _mapper.Map<User>(userObj);
        //        await _repositoryManager.Users.UpdateAsync( userEntity);
        //        await _repositoryManager.SaveAsync();
        //        return true;
        //    }
        //    return false;
        //}

        public async Task<bool> UpdateUserAsync(int id, UserDto userDto)
        {
            var existingUser = await _repositoryManager.Users.GetByIdAsync(id);
            if (existingUser == null)
                return false;

            existingUser.Email = userDto.Email ?? existingUser.Email;
            existingUser.FullName = userDto.FullName ?? existingUser.FullName;
            existingUser.Password = userDto.Password ?? existingUser.Password;
            existingUser.UpdatedAt = DateTime.UtcNow;

            await _repositoryManager.Users.UpdateAsync(existingUser);
            await _repositoryManager.SaveAsync();
            return true;
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _repositoryManager.Users.GetByIdAsync((int)id);
            if (user != null)
            {
                await _repositoryManager.Users.DeleteAsync((int)id);
                await _repositoryManager.SaveAsync();
                return true;
            }
            return false;
        }

        public async Task<UserDto?> GetUserByEmailAsync(string email)
        {
            var user = await _repositoryManager.Users.GetUserByEmailAsync(email);
            return _mapper.Map<UserDto>(user);
        }
        public async Task<UserDto> ValidateUserAsync(string email, string password)
        {
            var user = await _repositoryManager.Users.GetUserByEmailAsync(email);
            if (user == null)
                return null;

            // השוואת הסיסמה המוצפנת
            if (!BCrypt.Net.BCrypt.Verify(password, user.Password))
                return null;
            return _mapper.Map<UserDto>(user);

        }

        public async Task<string> GenerateJwtToken(UserDto user)
        {
            //if(user.Role == null)
         user= _mapper.Map<UserDto>(await _repositoryManager.Users.GetUserByEmailAsync(user.Email));
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Email, user.Email),
            };
            foreach (var role in user.Roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role.RoleName)); // ודא ש-RoleName הוא שם התפקיד
            }


            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Env.GetString("JWT_KEY")));
            var credentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                    issuer: Env.GetString("JWT_ISSUER"),
            audience: Env.GetString("JWT_AUDIENCE"),
                claims: claims,
                expires: DateTime.Now.AddMinutes(720),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<UserDto?> RegisterUserAsync(UserDto userObj)
        {
            var existingUser = await _repositoryManager.Users.GetUserByEmailAsync(userObj.Email);
            if (existingUser != null)
            {
                return null; // משתמש קיים
            }

            // הצפנת הסיסמה
            userObj.Password = BCrypt.Net.BCrypt.HashPassword(userObj.Password);

            var userEntity = _mapper.Map<User>(userObj);
            await _repositoryManager.Users.CreateAsync(userEntity);
            await _repositoryManager.SaveAsync();

            return _mapper.Map<UserDto>(userEntity);
        }


    }
}
