using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using Store.Infrastracture.DAL;
using Store.Infrastracture.Global.Helpers;
using Store.Infrastracture.Services.Cookies.CartProducts;
using Store.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Infrastracture.Services.Cookies.UserInteractor
{
    public class GuestInteractor : IUserInteractor
    {
        private readonly CartProductsService _cartProductsService;
        private readonly ProductDAO _productDAO;

        public GuestInteractor(CartProductsService cartProductsService)
        {
            _cartProductsService = cartProductsService;
            _productDAO = new ProductDAO();
        }

        virtual public async Task<CartProduct> IncludeProductAndUserInfo(CartProduct cartProduct)
        {
            var prod = await _productDAO.GetById(cartProduct.ProductId);
            cartProduct.Product = prod;
            // TODO: user info 
            return cartProduct;
        }

        virtual public async Task<List<CartProduct>>? GetCartProducts()
        {
            var cartProducts = _cartProductsService.GetCartProducts();
            List<CartProduct> cartProductsToReturn = new List<CartProduct>();
            if (cartProducts.IsNullOrEmpty())
                return null!;

            foreach (CartProduct? cartProd in cartProducts!)
            {
                cartProductsToReturn.Add(await IncludeProductAndUserInfo(cartProd));
            }

            return cartProductsToReturn;
        }

        virtual public async Task<CartProduct> GetCartProduct(Guid productId, ProductSize size)
        {
            var cartProducts = await GetCartProducts()!;
            return cartProducts!.Find(prod => prod.ProductId == productId && prod.ProductSize == size)!;
        }

        virtual public async Task<int> DeleteCartProduct(Guid productId, ProductSize size, bool oneQuantity = true)
        {
            return _cartProductsService.DeleteCartProduct(await GetCartProduct(productId, size), oneQuantity);
        }

        virtual public async Task<int> AddCartProduct(CartProduct cartProduct)
        {
            var cartProducts = await GetCartProducts()!;
            if (!cartProducts.IsNullOrEmpty())
            {
                if (cartProducts.Exists(prod => prod.ProductId == cartProduct.ProductId && prod.ProductSize == cartProduct.ProductSize))
                {
                    cartProducts.First(prod => prod.ProductId == cartProduct.ProductId && prod.ProductSize == cartProduct.ProductSize).Quantity++;
                    _cartProductsService.SetCartProducts(cartProducts);
                    return 1;
                }
            }

            if(cartProduct.Quantity == 0) cartProduct.Quantity++;
            _cartProductsService.AddCartProduct(cartProduct);
            return 1;
        }

        virtual public void ClearCart()
        {
            _cartProductsService.ClearCart();
        }
    }
}
