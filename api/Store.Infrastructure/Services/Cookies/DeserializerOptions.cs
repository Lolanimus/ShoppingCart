using Store.Infrastracture.Global.Helpers.ProductSizeConverter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Store.Infrastracture.Services.Cookies
{
    public static class DeserializerOptions
    {
        public readonly static JsonSerializerOptions opts = new()
        {
            Converters = { new JsonProductSizeConverter() }
        };
    }
}
