using System;
using System.Collections.Generic;

namespace Store.Models;

public class WebUser : StoreEntity
{
    public string UserEmail { get; set; } = null!;

    public string UserName { get; set; } = null!;

    public string UserPassword { get; set; } = null!;

    public string? UserFirstName { get; set; }

    public string? UserLastName { get; set; }

    public string? UserCity { get; set; }

    public string? UserStreet { get; set; }

    public int? UserNumber { get; set; }

    public string? UserZip { get; set; }

    public string? UserPhone { get; set; }
}
