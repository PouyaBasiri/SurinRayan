using Microsoft.AspNetCore.Mvc;
using SurinRayan.Application.Common.Interfaces;
using SurinRayan.Application.Features.ContactRequests.DTOs;

namespace SurinRayan.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IJwtTokenGenerator _jwtTokenGenerator;

        public AuthController(IJwtTokenGenerator jwtTokenGenerator)
        {
            _jwtTokenGenerator = jwtTokenGenerator;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto model)
        {
            if (model.Email == "admin@surinrayan.ir" && model.Password == "admin123")
            {
                var token = _jwtTokenGenerator.GenerateToken("1", model.Email, "Admin");

                return Ok(new LoginResponseDto
                {
                    Token = token,
                    Expiration = DateTime.UtcNow.AddDays(1)
                });
            }

            return Unauthorized(new { message = "نام کاربری یا رمز عبور اشتباه است." });
        }
    }
}
