using Microsoft.IdentityModel.Tokens;
using Store.Models.Cookies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Store.Infrastracture.Services.Cookies.Token
{
    public class TokenService
    {
        private readonly CookiesService _cookiesService;

        public TokenService(CookiesService cookiesService)
        {
            _cookiesService = cookiesService;
        }

        public Cookie GetPreviousCookies()
        {
            string? previousJsonCookies = _cookiesService.GetCookies();
            Cookie? previousCookies = JsonSerializer.Deserialize<Cookie>(previousJsonCookies!, DeserializerOptions.opts);

            return previousCookies!;
        }

        public string? GetJwtToken()
        {
            string? jsonCookies = _cookiesService.GetCookies();

            if(jsonCookies.IsNullOrEmpty() || !jsonCookies!.Contains("jwtToken"))
                return null;
            
            return JsonSerializer.Deserialize<Cookie>(jsonCookies!, DeserializerOptions.opts)!.JwtToken;
        }

        public void DeleteJtwToken()
        {
            var cookies = GetPreviousCookies();
            cookies!.JwtToken = null;

            _cookiesService.UpdateCookies(JsonSerializer.Serialize(cookies));
        }

        public void AddJtwToken(string jwtToken)
        {
            var cookies = GetPreviousCookies();
            cookies!.JwtToken = jwtToken;

            _cookiesService.UpdateCookies(JsonSerializer.Serialize(cookies));
        }

        public void UpdateJwtToken(string jwtToken)
        {
            DeleteJtwToken();
            AddJtwToken(jwtToken);
        }
    }
}
