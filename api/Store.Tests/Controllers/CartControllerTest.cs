using Microsoft.AspNetCore.Mvc;
using Store.Controllers;
using Store.Infrastracture.Global;
using Store.Infrastracture.Global.Helpers;
using Store.Infrastracture.Services.Cookies.UserInteractor;
using Store.Tests.Cookies;
using Store.ViewModels;


namespace Store.Tests.Controllers
{
    [Collection("Global Tests")]
    public class CartControllerTest : IClassFixture<UserInteractorTestFixture>, IAsyncLifetime
    {
        private readonly IUserInteractor _inter;
        private UserInteractorTestFixture _classFixture;

        public CartControllerTest(UserInteractorTestFixture classFixture)
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
            await getTests.GetCart();
            _classFixture.ResetCookies();
        }

        [Fact]
        public async Task RunDeleteTests()
        {
            var deleteTests = new Delete(_inter);
            await deleteTests.DeleteDecrementQuantity();
            await deleteTests.DeleteProductId();
        }

        [Fact]
        public async Task RunPostTests()
        {
            var postTests = new Post(_inter);
            await postTests.PostCartAdd();
            await postTests.PostCartIncrement();
            _classFixture.ResetCookies();
        }

        public class Get
        {
            private IUserInteractor _inter;

            public Get(IUserInteractor inter)
            {
                _inter = inter;
            }

            public async Task GetCart()
            {
                CartController cartController = new(_inter);
                List<CartViewModel> cart = (List<CartViewModel>)((await cartController.GetCart()) as OkObjectResult)!.Value;
                Assert.NotNull(cart);
                Assert.Equal(2, cart.Count);
            }
        }

        public class Post
        {
            private IUserInteractor _inter;

            public Post(IUserInteractor inter)
            {
                _inter = inter;
            }

            public async Task PostCartAdd()
            {
                CartController cartController = new(_inter);
                int beforeCartCount = ((List<CartViewModel>)((await cartController.GetCart()) as OkObjectResult)!.Value).Count;
                await cartController.AddToCart(new()
                {
                    ProductId = Data.NewMaleCartProductId,
                    ProductSize = Data.NewMaleCartProductSize
                });
                var afterCart = (List<CartViewModel>)((await cartController.GetCart()) as OkObjectResult)!.Value;
                Assert.NotNull(afterCart);
                Assert.Equal(3, afterCart.Count);
            }

            public async Task PostCartIncrement()
            {
                CartController cartController = new(_inter);
                var beforeCart = (List<CartViewModel>)((await cartController.GetCart()) as OkObjectResult)!.Value;
                await cartController.IncrementQuantity(Data.NewMaleCartProductId, Helper.sizeConverter.FromEnum(Data.NewMaleCartProductSize));
                var afterCart = (List<CartViewModel>)((await cartController.GetCart()) as OkObjectResult)!.Value;
                Assert.NotNull(afterCart);
                Assert.Equal(2, afterCart.First(p => p.ProductId == Data.NewMaleCartProductId).Quantity);
            }
        }

        private class Delete
        {
            private IUserInteractor _inter;

            public Delete(IUserInteractor inter)
            {
                _inter = inter;
            }

            public async Task DeleteDecrementQuantity()
            {
                Data.ResetGlobalCookies();
                CartController cartController = new(_inter);
                await cartController.AddToCart(new()
                {
                    ProductId = Data.NewMaleCartProductId,
                    ProductSize = Data.NewMaleCartProductSize,
                    Quantity = 2
                });
                await cartController.DecrementQuantity(Data.NewMaleCartProductId, Helper.sizeConverter.FromEnum(Data.NewMaleCartProductSize));
                var afterCart = (List<CartViewModel>)((await cartController.GetCart()) as OkObjectResult)!.Value;
                Assert.Equal(3, afterCart.Count);
                Assert.Equal(1, afterCart.First(p => p.ProductId == Data.NewMaleCartProductId).Quantity);
                await cartController.DecrementQuantity(Data.NewMaleCartProductId, Helper.sizeConverter.FromEnum(Data.NewMaleCartProductSize));
                var afterCart1 = (List<CartViewModel>)((await cartController.GetCart()) as OkObjectResult)!.Value;
                Assert.Equal(2, afterCart1.Count);
                Assert.Null(afterCart1.FirstOrDefault(p => p.ProductId == Data.NewMaleCartProductId));
            }

            public async Task DeleteProductId()
            {
                Data.ResetGlobalCookies();
                CartController cartController = new(_inter);
                await cartController.AddToCart(new()
                {
                    ProductId = Data.NewMaleCartProductId,
                    ProductSize = Data.NewMaleCartProductSize,
                    Quantity = 2
                });
                var beforeCart = (List<CartViewModel>)((await cartController.GetCart()) as OkObjectResult)!.Value;
                Assert.Equal(3, beforeCart.Count);
                await cartController.DeleteCartProduct(Data.NewMaleCartProductId, Helper.sizeConverter.FromEnum(Data.NewMaleCartProductSize));
                var afterCart = (List<CartViewModel>)((await cartController.GetCart()) as OkObjectResult)!.Value;
                Assert.Equal(2, afterCart.Count);
                Assert.Null(afterCart.FirstOrDefault(p => p.ProductId == Data.NewMaleCartProductId));
            }
        }
    }
}
