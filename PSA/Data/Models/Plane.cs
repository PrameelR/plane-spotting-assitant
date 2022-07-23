using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class Plane
    {
        public Plane()
        {
            PlaneSpottings = new HashSet<PlaneSpotting>();
            PlaneSpottingsLogs = new HashSet<PlaneSpottingsLog>();
            PlanesLogs = new HashSet<PlanesLog>();
        }

        public int Id { get; set; }
        public int Makeid { get; set; }
        public int Modelid { get; set; }
        public string Reference { get; set; } = null!;
        public string Referenceprefix { get; set; } = null!;
        public string Referencesuffix { get; set; } = null!;
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
        public virtual PlaneMake Make { get; set; } = null!;
        public virtual PlaneModel Model { get; set; } = null!;
        public virtual User? ModifiedbyNavigation { get; set; }
        public virtual ICollection<PlaneSpotting> PlaneSpottings { get; set; }
        public virtual ICollection<PlaneSpottingsLog> PlaneSpottingsLogs { get; set; }
        public virtual ICollection<PlanesLog> PlanesLogs { get; set; }
    }
}
