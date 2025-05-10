using EduShare.Core.DTOs;
using EduShare.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduShare.Core.IServices
{
    public interface IAuthService
    {
        Task< UserLoginResponse> LoginAsync(UserDto loginRequest);
        string GenerateJwtToken(UserDto user);

    }
}
