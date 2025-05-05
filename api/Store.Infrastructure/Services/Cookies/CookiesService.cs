using Microsoft.AspNetCore.Http;
using Store.Models;
using Store.Models.Cookies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Store.Infrastracture.Services.Cookies
{
    public class CookiesService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly string key = "userInfo";

        public CookiesService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string? GetCookies()
        {
            return _httpContextAccessor.HttpContext?.Request.Cookies[key];
        }

        public void ClearCookies()
        {
            _httpContextAccessor.HttpContext.Response.Cookies.Delete(key);
        }

        public void SetCookies(string data, int? expireMinutes = null)
        {
            var options = new CookieOptions
            {
                HttpOnly = true, // Prevents JavaScript from accessing the cookie
                Secure = true,   // Ensures the cookie is only sent over HTTPS
                SameSite = SameSiteMode.None // Prevents CSRF attacks
            };

            if (expireMinutes.HasValue)
                options.Expires = DateTime.Now.AddMinutes(expireMinutes.Value);

            _httpContextAccessor.HttpContext.Response.Cookies.Append(key, data, options);
        }

        public void UpdateCookies(string data, int? exp = null)
        {
            ClearCookies();
            SetCookies(data, exp);
        }
    }
}
