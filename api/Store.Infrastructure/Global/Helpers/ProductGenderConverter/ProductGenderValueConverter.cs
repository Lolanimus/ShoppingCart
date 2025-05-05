using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Store.Infrastracture.DAL;
using Store.Infrastracture.Global.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Store.Infrastracture.Global.Helpers.ProductGenderConverter
{
    public class ProductGenderValueConverter : ValueConverter<ProductGender, string>
    {
        public ProductGenderValueConverter() : base(
            v => Helper.productGenderConverter.FromEnum(v), // Convert Enum → String for DB
            v => Helper.productGenderConverter.ToEnum(v) // Ensure `Unknown` for null/empty
        )
        { }
    }
}
