using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Models
{
    public class PlaneModelList
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int Planemakeid { get; set; }
        public string Planemake { get; set; }
        public string Status { get; set; }
        public string? Createdby { get; set; }
        public string? Modifiedby { get; set; }
        public string? Deletedby { get; set; }
        public DateTime? Createddate { get; set; }
        public DateTime? Modifieddate { get; set; }
        public DateTime? Deleteddate { get; set; }
    }
}
