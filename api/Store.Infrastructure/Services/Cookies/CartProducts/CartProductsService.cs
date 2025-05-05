using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using Store.Infrastracture.Services.Cookies;
using Store.Models;
using Store.Models.Cookies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Store.Infrastracture.Services.Cookies.CartProducts
{
    public class CartProductsService
    {
        private readonly CookiesService _cookiesService;

        public CartProductsService(CookiesService cookiesService)
        {
            _cookiesService = cookiesService;
        }

        public void ClearCart()
        {
            string jwtToken = JsonSerializer.Deserialize<Cookie>(_cookiesService.GetCookies()!)!.JwtToken!;
            var newCookies = new Cookie() { JwtToken = jwtToken };
            string newCookiesJson = JsonSerializer.Serialize(newCookies);
            _cookiesService.ClearCookies();
            _cookiesService.SetCookies(newCookiesJson);
        }

        public Cookie? GetPreviousCookies()
        {
            string? previousJsonCookies = _cookiesService.GetCookies();
            if (previousJsonCookies.IsNullOrEmpty())
                return new Cookie();

            Cookie? previousCookies = JsonSerializer.Deserialize<Cookie>(previousJsonCookies!, DeserializerOptions.opts);
    
            return previousCookies!;
        }

        public List<CartProduct>? GetCartProducts()
        {
            string? cookies = _cookiesService.GetCookies();

            if (cookies.IsNullOrEmpty())
                return null;

            Cookie? cartProducts = JsonSerializer.Deserialize<Cookie>(cookies!, DeserializerOptions.opts);

            return cartProducts!.CartProducts;
        }

        public void SetCartProducts(List<CartProduct> cartProducts)
        {
            var prevCookies = GetPreviousCookies();
            prevCookies!.CartProducts = cartProducts;
            string? updatedJsonCookies = JsonSerializer.Serialize(prevCookies);

            _cookiesService.UpdateCookies(updatedJsonCookies);
        }

        public int DeleteCartProduct(CartProduct cartProduct, bool oneQuantity = true)
        {
            if (cartProduct == null)
                return 0;

            var prevCookie = GetPreviousCookies()!;
            var prevCartProducts = prevCookie.CartProducts!;

            CartProduct prodToRemove = prevCartProducts
                .FirstOrDefault(
                    prod => prod.ProductId == cartProduct.ProductId && 
                    prod.ProductSize == cartProduct.ProductSize
            )!;

            int prodToRemoveQuantity = prodToRemove.Quantity;

            if (oneQuantity && prodToRemove.Quantity > 1)
            {
                prevCartProducts.First(
                    prod => prod.ProductId == prodToRemove.ProductId 
                         && prod.ProductSize == prodToRemove.ProductSize
                ).Quantity--;
                prevCookie.CartProducts = prevCartProducts;
                _cookiesService.SetCookies(JsonSerializer.Serialize(prevCookie));
            }
            else
            {
                prevCartProducts!.Remove(prodToRemove);
                prevCookie.CartProducts = prevCartProducts;
                _cookiesService.UpdateCookies(JsonSerializer.Serialize(prevCookie));
            }

            var deletedProd = prevCookie.CartProducts!.FirstOrDefault(prod => prod.ProductId == cartProduct.ProductId);
            if (deletedProd == null || deletedProd.Quantity == prodToRemoveQuantity - 1)
                return 1;
            else
                return 0;
        }

        public void AddCartProduct(CartProduct cartProduct)
        {
            var prevCookie = GetPreviousCookies();
            var prevCartProducts = prevCookie!.CartProducts;
            prevCartProducts!.Add(cartProduct);
            prevCookie.CartProducts = prevCartProducts;
            string prevJsonCookie = JsonSerializer.Serialize(prevCookie);

            _cookiesService.UpdateCookies(prevJsonCookie);
        }

        public void UpdateCartProduct(CartProduct cartProduct)
        {
            DeleteCartProduct(cartProduct);
            AddCartProduct(cartProduct);
        }
    }
}
