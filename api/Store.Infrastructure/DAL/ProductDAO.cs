using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Store.Infrastracture.Repository;
using Store.UseCases.Interfaces.Repository;
using Store.Models;
using System.Diagnostics;
using System.Reflection;
using Store.Infrastracture.Global.Helpers;

namespace Store.Infrastracture.DAL
{
    public class ProductDAO
    {
        private readonly IRepository<Product> repo;

        public ProductDAO()
        {
            repo = new StoreRepository<Product>();
        }

        public async Task<List<Product>> GetAll(ProductGender productGender)
        {
            return await repo.GetSome(
                p => productGender != ProductGender.wtfIsThis && ( 
                    p.ProductGender == ProductGender.Uni || 
                    p.ProductGender == productGender
                )
            );
        }

        public async Task<Product> GetById(Guid id)
        {
            Product? selectedProduct;
            try
            {
                StoreContext _db = new();
                selectedProduct = await repo.GetOne(product => product.Id == id);
            }
            catch (Exception ex)
            {
                Debug.WriteLine("Problem in " + GetType().Name + " " +
                MethodBase.GetCurrentMethod()!.Name + " " + ex.Message);
                throw;
            }
            return selectedProduct!;
        }
    }
}
