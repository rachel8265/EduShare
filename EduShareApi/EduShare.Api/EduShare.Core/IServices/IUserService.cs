using Duende.IdentityModel.OidcClient;
using EduShare.Core.DTOs;
using EduShare.Core.Entities;
using System.Collections.Generic;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;

namespace EduShare.Core.IServices
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
        Task<UserDto> GetUserByIdAsync(int id);
        Task<UserDto> CreateUserAsync(UserDto user);
        Task<bool> UpdateUserAsync(int id, UserDto user);
        Task<bool> DeleteUserAsync(int id);
        Task<string> GenerateJwtToken(UserDto user);
        Task<UserDto> ValidateUserAsync(string email, string password);
        Task<UserDto?> RegisterUserAsync(UserDto user);
        Task<UserDto?> GetUserByEmailAsync(string email);


    }
}
