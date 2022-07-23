using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class PlaneSpotting
    {
        public PlaneSpotting()
        {
            PlaneSpottingsLogs = new HashSet<PlaneSpottingsLog>();
        }

        public long Id { get; set; }
        public int Planeid { get; set; }
        public string Location { get; set; } = null!;
        public DateTime Date { get; set; }
        public string Status { get; set; } = null!;
        public int Createdby { get; set; }
        public DateTime Createddate { get; set; }
        public int? Modifiedby { get; set; }
        public DateTime? Modifieddate { get; set; }
        public int? Deletedby { get; set; }
        public DateTime? Deleteddate { get; set; }
        public byte[]? Image { get; set; }

        public virtual User CreatedbyNavigation { get; set; } = null!;
        public virtual User? DeletedbyNavigation { get; set; }
        public virtual User? ModifiedbyNavigation { get; set; }
        public virtual Plane Plane { get; set; } = null!;
        public virtual ICollection<PlaneSpottingsLog> PlaneSpottingsLogs { get; set; }
    }
}
