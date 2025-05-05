using Store.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Infrastracture.Services.Cookies.UserInteractor
{
    public interface IUserInteractor
    {
        Task<List<CartProduct>>? GetCartProducts();

        Task<CartProduct> GetCartProduct(Guid productId, ProductSize size);

        Task<int> DeleteCartProduct(Guid productId, ProductSize size, bool oneQuantity = true);

        Task<int> AddCartProduct(CartProduct cartProduct);

        void ClearCart();
    }
}
