using AutoMapper;
using EduShare.Api.PostModels;
using EduShare.Core.DTOs;
using EduShare.Core.Entities;
using EduShare.Core.IServices;
using EduShare.Service.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EduShare.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IAuthService _authService;
        private readonly IMapper _mapper;

        public AuthController(IConfiguration configuration,IAuthService authService,IMapper mapper)
        {
            _authService = authService;
            _mapper = mapper;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> LoginAsync([FromBody] LoginModel loginUser)
        {
            if(loginUser == null)
            {
                return BadRequest("Invalid client request");
            }
            var UserDto = _mapper.Map<UserDto>(loginUser);
            var result = await _authService.LoginAsync(UserDto);
            if (result!=null)
            {
                return (IActionResult)result;
            }
            return Unauthorized();
        }
    }
}

