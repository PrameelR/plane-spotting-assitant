using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class PlaneModel
    {
        public PlaneModel()
        {
            PlaneModelsLogs = new HashSet<PlaneModelsLog>();
            Planes = new HashSet<Plane>();
            PlanesLogs = new HashSet<PlanesLog>();
        }

        public int Id { get; set; }
        public int Makeid { get; set; }
        public string Name { get; set; } = null!;
        public string Status { get; set; } = null!;
        public int Createdby { get; set; }
        public DateTime Createddate { get; set; }
        public int? Modifiedby { get; set; }
        public DateTime? Modifieddate { get; set; }
        public int? Deletedby { get; set; }
        public DateTime? Deleteddate { get; set; }

        public virtual User CreatedbyNavigation { get; set; } = null!;
        public virtual User? DeletedbyNavigation { get; set; }
        public virtual PlaneMake Make { get; set; } = null!;
        public virtual User? ModifiedbyNavigation { get; set; }
        public virtual ICollection<PlaneModelsLog> PlaneModelsLogs { get; set; }
        public virtual ICollection<Plane> Planes { get; set; }
        public virtual ICollection<PlanesLog> PlanesLogs { get; set; }
    }
}
