using Microsoft.CodeAnalysis.CSharp.Syntax;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Controllers
{
    public class CartControllerDTO<T> where T : class
    {
        public List<T> ViewModelArr { get; set; } = new List<T>();
        public double Total { get; set; } = 0.0;
    }
}
