using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Tests
{
    [CollectionDefinition("Global Tests")]
    public class GlobalTestCollection : ICollectionFixture<GlobalTestAsyncLifetime>
    {
    }
}
