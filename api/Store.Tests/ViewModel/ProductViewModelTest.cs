using Microsoft.AspNetCore.Mvc;
using Store.Infrastracture.Global;
using Store.Models;
using Store.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Tests.ViewModel
{
    [Collection("Global Tests")]
    public class ProductViewModelTest
    {
        [Fact]
        public async Task GetAllMale()
        {
            ProductViewModel prodVm = new() { ProductGender = "male" };
            List<ProductViewModel> products = await prodVm.GetAll();
            Assert.Equal(7, products.Count);
        }

        [Fact]
        public async Task GetAllFemale()
        {
            ProductViewModel prodVm = new() { ProductGender = "female" };
            List<ProductViewModel> products = await prodVm.GetAll();
            Assert.Equal(11, products.Count);
        }

        [Fact]
        public async Task GetAllUnknownGender()
        {
            ProductViewModel prodVm = new() { ProductGender = "wtfIsThis" };
            List<ProductViewModel> products = await prodVm.GetAll();
            Assert.Empty(products);
        }

        [Fact]
        public async Task GetById()
        {
            ProductViewModel prodVm = new() { Id = Data.FemaleCartProductId };
            Product product = await prodVm.GetById();
            Assert.NotNull(product);
        }
    }
}
