using Store.Infrastracture.DAL;
using Store.Models;

namespace Store.Infrastracture.Global.Helpers.ProductGenderConverter
{
    public class ProductGenderConverter
    {
        public string FromEnum(ProductGender value)
        {
            return value switch
            {
                ProductGender.Male => "male",
                ProductGender.Female => "female",
                ProductGender.Uni => "uni",
                _ => "wtfIsThis"
            };
        }

        public ProductGender ToEnum(string value)
        {
            value = value.ToLower();

            return value switch
            {
                "male" => ProductGender.Male,
                "female" => ProductGender.Female,
                "uni" => ProductGender.Uni,
                _ => ProductGender.wtfIsThis,
            };
        }
    }
}