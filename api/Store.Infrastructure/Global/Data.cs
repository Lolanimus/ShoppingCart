using Store.Infrastracture.Repository;
using Store.Models;
using Store.Models.Cookies;

namespace Store.Infrastracture.Global
{
    public static class Data
    {
        private static readonly StoreRepository<Product> _repo;
        private static List<Product> allProducts = new();

        static Data()
        {
            _repo = new StoreRepository<Product>();
        }

        public static Guid AccessoryCartProductId { get; set; }
        public static Guid FemaleCartProductId { get; set; }
        public static Guid NewMaleCartProductId { get; set; }
        public static ProductSize FemaleCartProductSize { get; } = ProductSize.M;
        public static ProductSize NewMaleCartProductSize { get; } = ProductSize.L;
        public static Cookie InitialCookies { get; } = new()
        {
            JwtToken = "",
            CartProducts = new List<CartProduct>()
            {
                new CartProduct()
                {
                    ProductId = Data.FemaleCartProductId,
                    ProductSize = Data.FemaleCartProductSize,
                    Quantity = 2
                },
                new CartProduct()
                {
                    ProductId = Data.AccessoryCartProductId,
                    Quantity = 1
                }
            }
        };
        public static Cookie GlobalCookies { get; set; } = InitialCookies;

        public static void ResetGlobalCookies()
        {
            GlobalCookies.JwtToken = "";
            GlobalCookies.CartProducts!.Clear();

            GlobalCookies.CartProducts.Add(new CartProduct()
            {
                ProductId = Data.FemaleCartProductId,
                ProductSize = Data.FemaleCartProductSize,
                Quantity = 2
            });

            GlobalCookies.CartProducts.Add(new CartProduct()
            {
                ProductId = Data.AccessoryCartProductId,
                Quantity = 1
            });
        }

        public static async Task SetAllProducts()
        {
            allProducts = await _repo.GetAll();
            AccessoryCartProductId = allProducts.FirstOrDefault(p => p.ProductName.StartsWith("Pierced"))!.Id;
            FemaleCartProductId = allProducts.FirstOrDefault(p => p.ProductName.StartsWith("DANVOUY"))!.Id;
            NewMaleCartProductId = allProducts.FirstOrDefault(p => p.ProductName.StartsWith("Mens Casual"))!.Id;
        }
    }
}
