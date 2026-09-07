using System;
using System.Collections.Generic;
using System.Text;

namespace SurinRayan.Application.Common.Interfaces
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(string userId, string email, string role);
    }
}
