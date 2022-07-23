using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models
{
    public class PlaneSpottingStat
    {
        [Key]
        public int Value { get; set; }
        public string Type { get; set; }
    }
}
