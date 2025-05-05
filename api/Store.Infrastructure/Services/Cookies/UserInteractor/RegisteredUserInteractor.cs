using Microsoft.IdentityModel.Tokens;
using Store.Infrastracture.DAL;
using Store.Infrastracture.Services.Cookies.CartProducts;
using Store.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Infrastracture.Services.Cookies.UserInteractor
{
    public class RegisteredUserInteractor : GuestInteractor
    {
        public RegisteredUserInteractor(CartProductsService cartProductsService) : base(cartProductsService)
        {
        }


    }
}