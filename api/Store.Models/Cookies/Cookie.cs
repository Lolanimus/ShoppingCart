using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Store.Models;

namespace Store.Models.Cookies
{
    public class Cookie
    {
        public string? JwtToken { get; set; } = string.Empty;
        public List<CartProduct>? CartProducts { get; set; } = new List<CartProduct>();
    }
}
