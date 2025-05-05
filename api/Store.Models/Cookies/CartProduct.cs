using System;
using System.Collections.Generic;

namespace Store.Models;

public class CartProduct
{
    public int Quantity { get; set; }

    public ProductSize ProductSize { get; set; }

    public Guid? Id { get; set; }

    public Guid ProductId { get; set; }

    public virtual WebUser? WebUser { get; set; }

    public virtual Product? Product { get; set; } = null!;
}
