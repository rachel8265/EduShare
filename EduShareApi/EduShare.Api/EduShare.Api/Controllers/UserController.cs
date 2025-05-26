
using AutoMapper;
using EduShare.Api.PostModels;
using EduShare.Core.DTOs;
using EduShare.Core.IRepositories;
using EduShare.Core.IServices;
using EduShare.Service.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace EduShare.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        readonly IUserService _usersService;
        readonly IMapper _mapper;

        public UserController(IUserService usersService, IMapper mapper)
        {
            _usersService = usersService;
            _mapper = mapper;
        }

        // GET: api/User
        [HttpGet]
        //[Authorize(Policy = "AdminOnly")]
        public async Task<ActionResult<List<UserDto>>> Get()
        {
            var users = await _usersService.GetAllUsersAsync();
            return users.ToList();
        }

        [Authorize] // כל משתמש מאומת יכול לגשת
        // GET api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetById(int id)
        {
            if (id < 0) return BadRequest();
            UserDto result = await _usersService.GetUserByIdAsync(id);
            if (result == null)
                return NotFound();
            return result;
        }

        // POST api/User
        //[HttpPost]
        //public async Task<ActionResult<bool>> Post([FromBody] UserPostModel user)
        //{
        //    UserDto UserDto = _mapper.Map<UserDto>(user);
        //    UserDto result = await _usersService.CreateUserAsync(UserDto);
        //    if (result == null)
        //    {
        //        return BadRequest(false);
        //    }
        //    else
        //        return true;
        //}

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel userLogin)
        {
            var userDto = _mapper.Map<UserDto>(userLogin);
            var user = await _usersService.ValidateUserAsync(userLogin.Email, userLogin.Password);
            if (user != null)
            {
                
                var tokenString = _usersService.GenerateJwtToken(userDto);
                return Ok(new { User = user, Token = tokenString });
            }
            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserPostModel user)
        {
            UserDto UserDto = _mapper.Map<UserDto>(user);
            var result = await _usersService.RegisterUserAsync(UserDto);

            if (result == null)
            {
                return BadRequest("User already exists.");
            }

            var tokenString = await _usersService.GenerateJwtToken(result);
           return Ok(new { User = result, Token = tokenString });
          
        }

        // PUT api/User/5
        [HttpPut("{id}")]
        [Authorize(Policy = "AdminOnly")] // רק Admin יכול לגשת??????????????????.
        public async Task<ActionResult<bool>> Put(int id, [FromBody] UserPostModel user)
        {
            UserDto UserDto = _mapper.Map<UserDto>(user);
            return await _usersService.UpdateUserAsync(id, UserDto) == false;
        }

        // DELETE api/User/5
        [HttpDelete("{id}")]
        //[Authorize(Policy = "AdminOnly")] // רק Admin יכול לגשת
        public async Task<ActionResult<bool>> Delete(int id)
        {
            return await _usersService.DeleteUserAsync(id);
        }



        [Authorize]
        [HttpGet("me")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            // שלוף את המייל מתוך ה-Claims של ה-JWT
            var email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            if (string.IsNullOrEmpty(email))
                return Unauthorized();

            var user = await _usersService.GetUserByEmailAsync(email);
            if (user == null)
                return NotFound();

            return Ok(user);
        }
    }
}