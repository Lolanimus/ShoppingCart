using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Store.ViewModels;
using System.Diagnostics;
using System.Reflection;

namespace Store.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductController : Controller
    {
        [HttpGet("all/{gender}")]
        public async Task<IActionResult> GetAll(string gender)
        {
            try
            {
                ProductViewModel viewmodel = new() { ProductGender = gender };
                List<ProductViewModel> allProducts = await viewmodel.GetAll();
                return Ok(allProducts);
            }
            catch (Exception ex)
            {
                Debug.WriteLine("Problem in " + GetType().Name + " " +
                MethodBase.GetCurrentMethod()!.Name + " " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError); // something went wrong
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            try
            {
                ProductViewModel prodVm = new ProductViewModel() { Id = id };
                await prodVm.GetById();
                return Ok(prodVm);
            }
            catch (Exception ex)
            {
                Debug.WriteLine("Problem in " + GetType().Name + " " +
                MethodBase.GetCurrentMethod()!.Name + " " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError); // something went wrong
            }
        }
    }
}
