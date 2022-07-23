using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class PlaneMakesLog
    {
        public long Id { get; set; }
        public int Planemakeid { get; set; }
        public string Name { get; set; } = null!;
        public string Status { get; set; } = null!;
        public string Action { get; set; } = null!;
        public int Createdby { get; set; }
        public DateTime Createddate { get; set; }
        public int? Modifiedby { get; set; }
        public DateTime? Modifieddate { get; set; }
        public int? Deletedby { get; set; }
        public DateTime? Deleteddate { get; set; }

        public virtual User CreatedbyNavigation { get; set; } = null!;
        public virtual User? DeletedbyNavigation { get; set; }
        public virtual User? ModifiedbyNavigation { get; set; }
        public virtual PlaneMake Planemake { get; set; } = null!;
    }
}
