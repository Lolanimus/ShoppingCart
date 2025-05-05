using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Models
{
    public class StoreEntity
    {
        public Guid Id { get; set; }

        [Timestamp]
        public byte[]? TimeStamp { get; set; }
    }
}
