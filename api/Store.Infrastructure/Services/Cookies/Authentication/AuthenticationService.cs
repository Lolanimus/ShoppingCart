using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using Store.Infrastracture.Services.Cookies.Token;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Infrastracture.Services.Cookies.Authentication
{
    public class AuthenticationService
    {
        private readonly TokenService _tokenService;

        public AuthenticationService(TokenService tokenService)
        {
            _tokenService = tokenService;
        }

        public bool IsUserLoggedIn()
        {
            bool isLoggedIn = _tokenService.GetJwtToken().IsNullOrEmpty();
            // need to validate
            return !isLoggedIn;
        }
    }
}
