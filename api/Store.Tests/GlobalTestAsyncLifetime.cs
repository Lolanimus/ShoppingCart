using Store.Infrastracture.Global;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Tests
{
    public class GlobalTestAsyncLifetime : IAsyncLifetime
    {
        public GlobalTestAsyncLifetime()
        {
            Console.WriteLine("Running global async lifetime setup before all tests.");
        }

        public async Task DisposeAsync()
        {
            await Task.CompletedTask;
        }

        public async Task InitializeAsync()
        {
            Console.WriteLine("Setting global async products before all tests.");
            Environment.SetEnvironmentVariable("ConnectionStrings__DefaultConnection", "Server=localhost,5433;Database=ShoppingCart;User Id=sa;Password=!Lolanimus;TrustServerCertificate=True;Encrypt=True;");
            await Data.SetAllProducts();
            Data.ResetGlobalCookies();
        }
    }
}
