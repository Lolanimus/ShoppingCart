using Store.Infrastracture.DAL;
using Store.Infrastracture.Global;
using Store.Infrastracture.Global.Helpers;
using Store.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Tests.DAO
{
    [Collection("Global Tests")]
    public class ProductDAOTest
    {
        [Fact]
        public async Task GetAllMale()
        {
            ProductDAO dao = new();
            List<Product> selectedProducts = await dao.GetAll(Helper.productGenderConverter.ToEnum("male"));
            Assert.Equal(7, selectedProducts.Count);
        }

        [Fact]
        public async Task GetAllFemale()
        {
            ProductDAO dao = new();
            List<Product> selectedProducts = await dao.GetAll(Helper.productGenderConverter.ToEnum("female"));
            Assert.Equal(11, selectedProducts.Count);
        }

        [Fact]
        public async Task GetAll()
        {
            ProductDAO dao = new();
            List<Product> selectedProducts = await dao.GetAll(Helper.productGenderConverter.ToEnum("maleiugyu"));
            Assert.Empty(selectedProducts);
        }

        [Fact]
        public async Task GetById()
        {
            ProductDAO dao = new();
            Product selectedProducts = await dao.GetById(Data.FemaleCartProductId);
            Assert.True(selectedProducts.Id == Data.FemaleCartProductId);
        }
    }
}
