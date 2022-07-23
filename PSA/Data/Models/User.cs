using System;
using System.Collections.Generic;

namespace Data.Models
{
    public partial class User
    {
        public User()
        {
            InverseCreatedbyNavigation = new HashSet<User>();
            InverseDeletedbyNavigation = new HashSet<User>();
            InverseModifiedbyNavigation = new HashSet<User>();
            PlaneCreatedbyNavigations = new HashSet<Plane>();
            PlaneDeletedbyNavigations = new HashSet<Plane>();
            PlaneMakeCreatedbyNavigations = new HashSet<PlaneMake>();
            PlaneMakeDeletedbyNavigations = new HashSet<PlaneMake>();
            PlaneMakeModifiedbyNavigations = new HashSet<PlaneMake>();
            PlaneMakesLogCreatedbyNavigations = new HashSet<PlaneMakesLog>();
            PlaneMakesLogDeletedbyNavigations = new HashSet<PlaneMakesLog>();
            PlaneMakesLogModifiedbyNavigations = new HashSet<PlaneMakesLog>();
            PlaneModelCreatedbyNavigations = new HashSet<PlaneModel>();
            PlaneModelDeletedbyNavigations = new HashSet<PlaneModel>();
            PlaneModelModifiedbyNavigations = new HashSet<PlaneModel>();
            PlaneModelsLogCreatedbyNavigations = new HashSet<PlaneModelsLog>();
            PlaneModelsLogDeletedbyNavigations = new HashSet<PlaneModelsLog>();
            PlaneModelsLogModifiedbyNavigations = new HashSet<PlaneModelsLog>();
            PlaneModifiedbyNavigations = new HashSet<Plane>();
            PlaneSpottingCreatedbyNavigations = new HashSet<PlaneSpotting>();
            PlaneSpottingDeletedbyNavigations = new HashSet<PlaneSpotting>();
            PlaneSpottingModifiedbyNavigations = new HashSet<PlaneSpotting>();
            PlaneSpottingsLogCreatedbyNavigations = new HashSet<PlaneSpottingsLog>();
            PlaneSpottingsLogDeletedbyNavigations = new HashSet<PlaneSpottingsLog>();
            PlaneSpottingsLogModifiedbyNavigations = new HashSet<PlaneSpottingsLog>();
            PlanesLogCreatedbyNavigations = new HashSet<PlanesLog>();
            PlanesLogDeletedbyNavigations = new HashSet<PlanesLog>();
            PlanesLogModifiedbyNavigations = new HashSet<PlanesLog>();
        }

        public int Id { get; set; }
        public int Usertypeid { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Status { get; set; } = null!;
        public int? Createdby { get; set; }
        public DateTime? Createddate { get; set; }
        public int? Modifiedby { get; set; }
        public DateTime? Modifieddate { get; set; }
        public int? Deletedby { get; set; }
        public DateTime? Deleteddate { get; set; }

        public virtual User? CreatedbyNavigation { get; set; }
        public virtual User? DeletedbyNavigation { get; set; }
        public virtual User? ModifiedbyNavigation { get; set; }
        public virtual UserType Usertype { get; set; } = null!;
        public virtual ICollection<User> InverseCreatedbyNavigation { get; set; }
        public virtual ICollection<User> InverseDeletedbyNavigation { get; set; }
        public virtual ICollection<User> InverseModifiedbyNavigation { get; set; }
        public virtual ICollection<Plane> PlaneCreatedbyNavigations { get; set; }
        public virtual ICollection<Plane> PlaneDeletedbyNavigations { get; set; }
        public virtual ICollection<PlaneMake> PlaneMakeCreatedbyNavigations { get; set; }
        public virtual ICollection<PlaneMake> PlaneMakeDeletedbyNavigations { get; set; }
        public virtual ICollection<PlaneMake> PlaneMakeModifiedbyNavigations { get; set; }
        public virtual ICollection<PlaneMakesLog> PlaneMakesLogCreatedbyNavigations { get; set; }
        public virtual ICollection<PlaneMakesLog> PlaneMakesLogDeletedbyNavigations { get; set; }
        public virtual ICollection<PlaneMakesLog> PlaneMakesLogModifiedbyNavigations { get; set; }
        public virtual ICollection<PlaneModel> PlaneModelCreatedbyNavigations { get; set; }
        public virtual ICollection<PlaneModel> PlaneModelDeletedbyNavigations { get; set; }
        public virtual ICollection<PlaneModel> PlaneModelModifiedbyNavigations { get; set; }
        public virtual ICollection<PlaneModelsLog> PlaneModelsLogCreatedbyNavigations { get; set; }
        public virtual ICollection<PlaneModelsLog> PlaneModelsLogDeletedbyNavigations { get; set; }
        public virtual ICollection<PlaneModelsLog> PlaneModelsLogModifiedbyNavigations { get; set; }
        public virtual ICollection<Plane> PlaneModifiedbyNavigations { get; set; }
        public virtual ICollection<PlaneSpotting> PlaneSpottingCreatedbyNavigations { get; set; }
        public virtual ICollection<PlaneSpotting> PlaneSpottingDeletedbyNavigations { get; set; }
        public virtual ICollection<PlaneSpotting> PlaneSpottingModifiedbyNavigations { get; set; }
        public virtual ICollection<PlaneSpottingsLog> PlaneSpottingsLogCreatedbyNavigations { get; set; }
        public virtual ICollection<PlaneSpottingsLog> PlaneSpottingsLogDeletedbyNavigations { get; set; }
        public virtual ICollection<PlaneSpottingsLog> PlaneSpottingsLogModifiedbyNavigations { get; set; }
        public virtual ICollection<PlanesLog> PlanesLogCreatedbyNavigations { get; set; }
        public virtual ICollection<PlanesLog> PlanesLogDeletedbyNavigations { get; set; }
        public virtual ICollection<PlanesLog> PlanesLogModifiedbyNavigations { get; set; }
    }
}
