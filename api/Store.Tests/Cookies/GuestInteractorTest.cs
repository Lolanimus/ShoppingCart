using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Store.Infrastracture.Services.Cookies.CartProducts;
using Store.Infrastracture.Services.Cookies.Token;
using Store.Infrastracture.Services.Cookies;
using Store.Models;
using Store.Models.Cookies;
using System.Text.Json;
using Store.Infrastracture.Services.Cookies.UserInteractor;
using Store.Infrastracture.Services.Cookies.Authentication;
using Moq;
using Store.Infrastracture.DAL;
using Store.Infrastracture.Global;

namespace Store.Tests.Cookies
{
    public class UserInteractorTestFixture 
    {
        private readonly Mock<HttpContext> context = new();
        private readonly Mock<HttpResponse> response = new();
        private readonly Mock<HttpRequest> request = new();
        private readonly Mock<IRequestCookieCollection> requestCookie = new();
        private readonly Mock<IResponseCookies> responseCookie = new();

        private readonly string key = "userInfo";
        private readonly ServiceProvider _serviceProvider;
        public IUserInteractor UserInteractor { get; }

        private void Append(string key, string value, CookieOptions options)
        {
            Cookie valueCookies = JsonSerializer.Deserialize<Cookie>(value)!;
            Data.GlobalCookies.JwtToken = valueCookies.JwtToken ?? "";
            Data.GlobalCookies.CartProducts!.Clear();
            foreach (CartProduct cartProduct in valueCookies.CartProducts!)
            {
                Data.GlobalCookies.CartProducts.Add(cartProduct);
            }
        }

        private void Delete(string key)
        {
            Data.GlobalCookies.JwtToken = "";
            Data.GlobalCookies.CartProducts!.Clear();
        }

        private void SetCookies()
        {
            requestCookie.Setup(rc => rc[key]).Returns(JsonSerializer.Serialize(Data.GlobalCookies));
            responseCookie.Setup(cxt => cxt.Append(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CookieOptions>()))
                .Callback<string, string, CookieOptions>((key, value, opts) =>
                {
                    Append(key, value, opts);
                    requestCookie.Setup(rc => rc[key]).Returns(JsonSerializer.Serialize(Data.GlobalCookies));
                });
            responseCookie.Setup(cxt => cxt.Delete(It.IsAny<string>()))
                .Callback<string>((key) =>
                {
                    Delete(key);
                    requestCookie.Setup(rc => rc[key]).Returns(JsonSerializer.Serialize(Data.GlobalCookies));
                });

        }

        public void ResetCookies()
        {
            Data.ResetGlobalCookies();
            SetCookies();
        }

        public UserInteractorTestFixture()
        { 
            SetCookies();

            response.Setup(r => r.Cookies).Returns(responseCookie.Object);
            request.Setup(r => r.Cookies).Returns(requestCookie.Object);
            context.Setup(r => r.Response).Returns(response.Object);
            context.Setup(r => r.Request).Returns(request.Object);

            var contextAccessor = new Mock<IHttpContextAccessor>();
            contextAccessor.Setup(c => c.HttpContext).Returns(context.Object);

            var _services = new ServiceCollection();

            _services.AddSingleton<IHttpContextAccessor>(contextAccessor.Object);
            _services.AddScoped<CookiesService>();
            _services.AddScoped<CartProductsService>();
            _services.AddScoped<TokenService>();
            _services.AddScoped<AuthenticationService>();
            _services.AddScoped<IUserInteractor>(serviceProvider =>
            {
                var authService = serviceProvider.GetRequiredService<AuthenticationService>();
                var cartProductService = serviceProvider.GetRequiredService<CartProductsService>();

                return authService.IsUserLoggedIn()
                    ? new RegisteredUserInteractor(cartProductService)
                    : new GuestInteractor(cartProductService);
            });

            _serviceProvider = _services.BuildServiceProvider();

            UserInteractor = _serviceProvider.GetRequiredService<IUserInteractor>();
        }
    }

    [Collection("Global Tests")]
    public class UserInteractorTest : IClassFixture<UserInteractorTestFixture>, IAsyncLifetime
    {
        private readonly IUserInteractor _inter;
        private UserInteractorTestFixture _classFixture;

        public UserInteractorTest(UserInteractorTestFixture classFixture)
        {
            _classFixture = classFixture;
            _inter = _classFixture.UserInteractor;
        }

        public async Task InitializeAsync()
        {
            Data.ResetGlobalCookies();
            await Task.CompletedTask;
        }

        public async Task DisposeAsync()
        {
            await Task.CompletedTask;
        }

        [Fact]
        public async Task RunGetTests()
        {
            var getTests = new Get(_inter);
            await getTests.GetCartProducts();
            await getTests.GetCartProduct();
            _classFixture.ResetCookies();
        }

        [Fact]
        public async Task RunDeleteTests()
        {
            var deleteTests = new Delete(_inter);
            await deleteTests.DeleteOneQuantityCartProduct();
            await deleteTests.DeleteAllQuantityCartProduct();
            _classFixture.ResetCookies();
        }

        [Fact]
        public async Task RunPostTests()
        {
            var postTests = new Post(_inter);
            await postTests.AddNewCartProduct();
            await postTests.IncrementCartProductQuantity();
            await postTests.AddTwoNewCartProductsWithTheSameSize();
            _classFixture.ResetCookies();
        }

        [Collection("SequentialUserInteractorTests")]
        public class Get
        {
            private readonly IUserInteractor _inter;

            public Get(IUserInteractor inter)
            {
                _inter = inter;
            }

            public async Task GetCartProducts()
            {
                var cartProducts = await _inter.GetCartProducts()!;

                // reads at least smth
                Assert.NotNull(cartProducts);
                // reads the right amount of objects
                Assert.Equal(2, cartProducts.Count);
                // the unspecified ProductSize for a Product with ProductGender == null
                // is automatically assigned a ProductSize.Unknown
                Assert.Equal(ProductSize.Unknown, cartProducts[1].ProductSize);
                Assert.True(cartProducts[1].Product!.ProductGender == ProductGender.Uni);

                Assert.Equal(Data.FemaleCartProductSize, cartProducts[0].ProductSize);
                Assert.Equal(ProductGender.Female, cartProducts[0].Product!.ProductGender);

                Assert.True(cartProducts[0].ProductId == Data.FemaleCartProductId);
            }

            public async Task GetCartProduct()
            {
                var cartProduct = await _inter.GetCartProduct(
                    Data.FemaleCartProductId,
                    ProductSize.M
                );

                Assert.NotNull(cartProduct);
                Assert.Equal(Data.FemaleCartProductId, cartProduct.ProductId);
                Assert.Equal(ProductGender.Female, cartProduct.Product!.ProductGender);
            }
        }

        [Collection("SequentialUserInteractorTests")]
        public class Delete
        {
            private readonly IUserInteractor _inter;

            public Delete(IUserInteractor inter)
            {
                _inter = inter;
            }

            public async Task DeleteOneQuantityCartProduct()
            {
                var cartProducts = await _inter.GetCartProducts()!;
                Assert.Equal(2, cartProducts[0].Quantity);
                await _inter.DeleteCartProduct(Data.FemaleCartProductId, Data.FemaleCartProductSize);
                cartProducts = await _inter.GetCartProducts()!;
                Assert.True(cartProducts.Count == 2);
                Assert.Equal(1, cartProducts[0].Quantity);
            }

            public async Task DeleteAllQuantityCartProduct()
            {
                var cartProducts = await _inter.GetCartProducts()!;
                Assert.Equal(1, cartProducts[0].Quantity);
                await _inter.DeleteCartProduct(Data.FemaleCartProductId, Data.FemaleCartProductSize, false);
                cartProducts = await _inter.GetCartProducts()!;
                Assert.True(cartProducts.Count == 1);
                Assert.True(cartProducts[0].ProductId == Data.AccessoryCartProductId);
            }
        }

        [Collection("SequentialUserInteractorTests")]
        public class Post
        {
            private IUserInteractor _inter;

            public CartProduct ProductToAdd { get; } = new CartProduct()
            {
                ProductId = Data.NewMaleCartProductId,
                ProductSize = ProductSize.L
            };

            public CartProduct ProductQuantityIncrement { get; } = new CartProduct()
            {
                ProductId = Data.FemaleCartProductId,
                ProductSize = Data.FemaleCartProductSize
            };

            public Post(IUserInteractor inter)
            {
                _inter = inter;
            }

            public async Task AddNewCartProduct()
            {
                await _inter.AddCartProduct(ProductToAdd);
                var cartProducts = await _inter.GetCartProducts()!;
                var cartProduct = await _inter.GetCartProduct(ProductToAdd.ProductId, ProductToAdd.ProductSize);
                Assert.NotNull(cartProduct);
                Assert.Equal(3, cartProducts.Count);
            }

            public async Task AddTwoNewCartProductsWithTheSameSize()
            {
                CartProduct cartProduct1 = new() { ProductId = Data.NewMaleCartProductId, ProductSize = ProductSize.M };
                await _inter.AddCartProduct(cartProduct1);
                await _inter.AddCartProduct(ProductToAdd);
                await _inter.AddCartProduct(cartProduct1);
                var cartProductAfter = await _inter.GetCartProduct(ProductToAdd.ProductId, ProductToAdd.ProductSize);
                var cartProduct1After = await _inter.GetCartProduct(cartProduct1.ProductId, cartProduct1.ProductSize);
                Assert.Equal(2, cartProductAfter.Quantity);
                Assert.Equal(2, cartProduct1After.Quantity);
            }

            public async Task IncrementCartProductQuantity()
            {
                await _inter.AddCartProduct(ProductQuantityIncrement);
                var cartProducts = await _inter.GetCartProducts()!;
                var cartProduct = await _inter.GetCartProduct(Data.FemaleCartProductId, Data.FemaleCartProductSize);
                Assert.NotNull(cartProduct);
                Assert.Equal(3, cartProduct.Quantity);
            }
        }
    }
}
