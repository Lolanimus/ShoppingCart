using Store.Infrastracture.Global.Helpers.ProductGenderConverter;
using Store.Infrastracture.Global.Helpers.ProductSizeConverter;
using Store.Models;


namespace Store.Infrastracture.Global.Helpers
{
    public static class Helper
    {
        public static JsonProductSizeConverter jsonProductSizeConverter = new();
        public static ProductSizeConverter.ProductSizeConverter sizeConverter = new();
        public static bool ClothesHasSize(CartProduct prod)
        {
            if (prod.Product!.ProductGender == DAL.ProductGender.Uni && prod.ProductSize == ProductSize.Unknown)
                return false;
            else
                return true;
        }
        public static ProductGenderConverter.ProductGenderConverter productGenderConverter = new();
        public static ProductGenderValueConverter productGenderValueConverter = new();
    }
}
