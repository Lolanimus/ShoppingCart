using Azure.Core;
using Castle.Components.DictionaryAdapter.Xml;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Store.Infrastracture.DTO;
using Store.Infrastracture.Services.Cookies.UserInteractor;
using Store.Models;
using Store.ViewModels;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Store.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CartController : Controller
    {
        private readonly IUserInteractor _userInteractor;

        public CartController(IUserInteractor userInteractor)
        {
            _userInteractor = userInteractor;
        }

        [HttpGet]
        public async Task<IActionResult> GetCart(Guid? id = null)
        {
            double total = 0.0;
            
            try
            {
                CartViewModel cartVm = new CartViewModel(_userInteractor) { Id = id };
                List<CartViewModel>? allCartVm = await cartVm.GetCart()!;
                
                // Return empty cart instead of NotFound when cart is empty
                if (allCartVm == null || allCartVm.IsNullOrEmpty())
                {
                    return Ok(new CartControllerDTO<CartViewModel> 
                    { 
                        ViewModelArr = new List<CartViewModel>(), 
                        Total = 0.0 
                    });
                }
                
                // Filter out cart items with null products and calculate total
                List<CartViewModel> validCartItems = new List<CartViewModel>();
                foreach (var cart in allCartVm)
                {
                    // Skip items where product is null (product may have been deleted from database)
                    if (cart.Product == null || cart.Quantity == null)
                    {
                        continue;
                    }
                    
                    total += (double)(cart.Quantity * cart.Product.ProductPrice);
                    validCartItems.Add(cart);
                }
                
                return Ok(new CartControllerDTO<CartViewModel>
                { 
                    ViewModelArr = validCartItems, 
                    Total = total 
                });
            }
            catch (Exception ex)
            {
                Debug.WriteLine("Problem in " + GetType().Name + " " +
                MethodBase.GetCurrentMethod()!.Name + " " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError); // something went wrong
            }
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddToCart(CartProductDTO cartDTO)
        {
            try
            {
                CartViewModel cart = CartViewModel.FromDto(cartDTO, _userInteractor);
                return await cart.AddCartProduct() == 1 ? Ok(cart) : BadRequest();
            }
            catch (Exception ex)
            {
                Debug.WriteLine("Problem in " + GetType().Name + " " +
                MethodBase.GetCurrentMethod()!.Name + " " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError); // something went wrong
            }
        }

        [HttpPost("qIncrement/{productId}")]
        public async Task<IActionResult> IncrementQuantity(Guid productId, string? size = null)
        {
            try
            {
                CartViewModel cart = new CartViewModel(_userInteractor) { ProductId = productId, ProductSize = size };
                return await cart.AddCartProduct() == 1 ? Ok(cart) : BadRequest();
            }
            catch (Exception ex)
            {
                Debug.WriteLine("Problem in " + GetType().Name + " " +
                MethodBase.GetCurrentMethod()!.Name + " " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError); // something went wrong
            }
        }

        [HttpDelete("delete/{productId}")]
        public async Task<IActionResult> DeleteCartProduct(Guid productId, string? size = null)
        {
            try
            {
                CartViewModel cart = new CartViewModel(_userInteractor) { ProductId = productId, ProductSize = size };
                return await cart.DeleteCartProduct(false) == 1 ? Ok(cart) : NotFound();
            }
            catch (Exception ex)
            {
                Debug.WriteLine("Problem in " + GetType().Name + " " +
                MethodBase.GetCurrentMethod()!.Name + " " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError); // something went wrong
            }
        }

        [HttpDelete("qDecrement/{productId}")]
        public async Task<IActionResult> DecrementQuantity(Guid productId, string? size = null)
        {
            try
            {
                CartViewModel cart = new CartViewModel(_userInteractor) { ProductId = productId, ProductSize = size };
                return await cart.DeleteCartProduct(true) == 1 ? Ok(cart) : NotFound();
            }
            catch (Exception ex)
            {
                Debug.WriteLine("Problem in " + GetType().Name + " " +
                MethodBase.GetCurrentMethod()!.Name + " " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError); // something went wrong
            }
        }

        [HttpDelete]
        public IActionResult ClearCart()
        {
            try
            {
                _userInteractor.ClearCart();
                return Ok();
            }
            catch (Exception ex)
            {
                Debug.WriteLine("Problem in " + GetType().Name + " " +
                MethodBase.GetCurrentMethod()!.Name + " " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError); // something went wrong
            }
        }
    }
}
