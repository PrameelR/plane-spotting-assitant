using System;
using System.Collections.Generic;
using System.Data;
using Data.ResponseModels;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

namespace Data.Models
{
    public partial class PSAContext : DbContext
    {
        public IConfiguration configuration { get; }
        public String constrapp { get; set; }
        public PSAContext(IConfiguration configuration)
        {
            this.constrapp = configuration["Configuration:ConnectionStrings:PSAConnection"];
        }

        public PSAContext(DbContextOptions<PSAContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Plane> Planes { get; set; } = null!;
        public virtual DbSet<PlaneMake> PlaneMakes { get; set; } = null!;
        public virtual DbSet<PlaneMakesLog> PlaneMakesLogs { get; set; } = null!;
        public virtual DbSet<PlaneModel> PlaneModels { get; set; } = null!;
        public virtual DbSet<PlaneModelsLog> PlaneModelsLogs { get; set; } = null!;
        public virtual DbSet<PlaneSpotting> PlaneSpottings { get; set; } = null!;
        public virtual DbSet<PlaneSpottingsLog> PlaneSpottingsLogs { get; set; } = null!;
        public virtual DbSet<PlanesLog> PlanesLogs { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<UserType> UserTypes { get; set; } = null!; 
        
        public virtual DbSet<UserList> UserList { get; set; }
        public virtual DbSet<PlaneMakeList> PlaneMakeList { get; set; }
        public virtual DbSet<PlaneModelList> PlaneModelList { get; set; }
        public virtual DbSet<PlaneList> PlaneList { get; set; }
        public virtual DbSet<PlaneSpottingList> PlaneSpottingList { get; set; }
        public virtual DbSet<RecentPlaneSpottings> RecentPlaneSpottings { get; set; }
        public virtual DbSet<PlaneSpottingStat> PlaneSpottingStat { get; set; }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-LE1EKSE;Initial Catalog=PSA;Integrated Security=true;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Plane>(entity =>
            {
                entity.ToTable("planes");

                entity.HasIndex(e => new { e.Makeid, e.Modelid, e.Reference }, "uc_plane")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Createdby).HasColumnName("createdby");

                entity.Property(e => e.Createddate)
                    .HasColumnType("datetime")
                    .HasColumnName("createddate");

                entity.Property(e => e.Deletedby).HasColumnName("deletedby");

                entity.Property(e => e.Deleteddate)
                    .HasColumnType("datetime")
                    .HasColumnName("deleteddate");

                entity.Property(e => e.Image)
                    .HasMaxLength(50)
                    .HasColumnName("image")
                    .IsFixedLength();

                entity.Property(e => e.Makeid).HasColumnName("makeid");

                entity.Property(e => e.Modelid).HasColumnName("modelid");

                entity.Property(e => e.Modifiedby).HasColumnName("modifiedby");

                entity.Property(e => e.Modifieddate)
                    .HasColumnType("datetime")
                    .HasColumnName("modifieddate");

                entity.Property(e => e.Reference)
                    .HasMaxLength(8)
                    .HasColumnName("reference");

                entity.Property(e => e.Referenceprefix)
                    .HasMaxLength(2)
                    .HasColumnName("referenceprefix");

                entity.Property(e => e.Referencesuffix)
                    .HasMaxLength(5)
                    .HasColumnName("referencesuffix");

                entity.Property(e => e.Status)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .HasColumnName("status")
                    .IsFixedLength();

                entity.HasOne(d => d.CreatedbyNavigation)
                    .WithMany(p => p.PlaneCreatedbyNavigations)
                    .HasForeignKey(d => d.Createdby)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PLANE_CREATEUSER");

                entity.HasOne(d => d.DeletedbyNavigation)
                    .WithMany(p => p.PlaneDeletedbyNavigations)
                    .HasForeignKey(d => d.Deletedby)
                    .HasConstraintName("FK_PLANE_DELETEUSER");

                entity.HasOne(d => d.Make)
                    .WithMany(p => p.Planes)
                    .HasForeignKey(d => d.Makeid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PLANE_PLANEMAKE");

                entity.HasOne(d => d.Model)
                    .WithMany(p => p.Planes)
                    .HasForeignKey(d => d.Modelid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PLANE_PLANEMODEL");

                entity.HasOne(d => d.ModifiedbyNavigation)
                    .WithMany(p => p.PlaneModifiedbyNavigations)
                    .HasForeignKey(d => d.Modifiedby)
                    .HasConstraintName("FK_PLANE_MODIFIEDUSER");
            });

            modelBuilder.Entity<PlaneMake>(entity =>
            {
                entity.ToTable("plane_makes");

                entity.HasIndex(e => e.Name, "UQ__plane_ma__72E12F1B71878A1E")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Createdby).HasColumnName("createdby");

                entity.Property(e => e.Createddate)
                    .HasColumnType("datetime")
                    .HasColumnName("createddate");

                entity.Property(e => e.Deletedby).HasColumnName("deletedby");

                entity.Property(e => e.Deleteddate)
                    .HasColumnType("datetime")
                    .HasColumnName("deleteddate");

                entity.Property(e => e.Modifiedby).HasColumnName("modifiedby");

                entity.Property(e => e.Modifieddate)
                    .HasColumnType("datetime")
                    .HasColumnName("modifieddate");

                entity.Property(e => e.Name)
                    .HasMaxLength(128)
                    .HasColumnName("name");

                entity.Property(e => e.Status)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .HasColumnName("status")
                    .IsFixedLength();

                entity.HasOne(d => d.CreatedbyNavigation)
                    .WithMany(p => p.PlaneMakeCreatedbyNavigations)
                    .HasForeignKey(d => d.Createdby)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PLANEMAKE_CREATEUSER");

                entity.HasOne(d => d.DeletedbyNavigation)
                    .WithMany(p => p.PlaneMakeDeletedbyNavigations)
                    .HasForeignKey(d => d.Deletedby)
                    .HasConstraintName("FK_PLANEMAKE_DELETEUSER");

                entity.HasOne(d => d.ModifiedbyNavigation)
                    .WithMany(p => p.PlaneMakeModifiedbyNavigations)
                    .HasForeignKey(d => d.Modifiedby)
                    .HasConstraintName("FK_PLANEMAKE_MODIFIEDUSER");
            });

            modelBuilder.Entity<PlaneMakesLog>(entity =>
            {
                entity.ToTable("plane_makes_log");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Action)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("action");

                entity.Property(e => e.Createdby).HasColumnName("createdby");

                entity.Property(e => e.Createddate)
                    .HasColumnType("datetime")
                    .HasColumnName("createddate");

                entity.Property(e => e.Deletedby).HasColumnName("deletedby");

                entity.Property(e => e.Deleteddate)
                    .HasColumnType("datetime")
                    .HasColumnName("deleteddate");

                entity.Property(e => e.Modifiedby).HasColumnName("modifiedby");

                entity.Property(e => e.Modifieddate)
                    .HasColumnType("datetime")
                    .HasColumnName("modifieddate");

                entity.Property(e => e.Name)
                    .HasMaxLength(128)
                    .HasColumnName("name");

                entity.Property(e => e.Planemakeid).HasColumnName("planemakeid");

                entity.Property(e => e.Status)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .HasColumnName("status")
                    .IsFixedLength();

                entity.HasOne(d => d.CreatedbyNavigation)
                    .WithMany(p => p.PlaneMakesLogCreatedbyNavigations)
                    .HasForeignKey(d => d.Createdby)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PLANEMAKELOG_CREATEUSER");

                entity.HasOne(d => d.DeletedbyNavigation)
                    .WithMany(p => p.PlaneMakesLogDeletedbyNavigations)
                    .HasForeignKey(d => d.Deletedby)
                    .HasConstraintName("FK_PLANEMAKELOG_DELETEUSER");

                entity.HasOne(d => d.ModifiedbyNavigation)
                    .WithMany(p => p.PlaneMakesLogModifiedbyNavigations)
                    .HasForeignKey(d => d.Modifiedby)
                    .HasConstraintName("FK_PLANEMAKELOG_MODIFIEDUSER");

                entity.HasOne(d => d.Planemake)
                    .WithMany(p => p.PlaneMakesLogs)
                    .HasForeignKey(d => d.Planemakeid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PLANEMAKELOG_PLANEMAKE");
            });

            modelBuilder.Entity<PlaneModel>(entity =>
            {
                entity.ToTable("plane_models");

                entity.HasIndex(e => e.Name, "UQ__plane_mo__72E12F1B88B95C31")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Createdby).HasColumnName("createdby");

                entity.Property(e => e.Createddate)
                    .HasColumnType("datetime")
                    .HasColumnName("createddate");

                entity.Property(e => e.Deletedby).HasColumnName("deletedby");

                entity.Property(e => e.Deleteddate)
                    .HasColumnType("datetime")
                    .HasColumnName("deleteddate");

                entity.Property(e => e.Makeid).HasColumnName("makeid");

                entity.Property(e => e.Modifiedby).HasColumnName("modifiedby");

                entity.Property(e => e.Modifieddate)
                    .HasColumnType("datetime")
                    .HasColumnName("modifieddate");

                entity.Property(e => e.Name)
                    .HasMaxLength(128)
                    .HasColumnName("name");

                entity.Property(e => e.Status)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .HasColumnName("status")
                    .IsFixedLength();

                entity.HasOne(d => d.CreatedbyNavigation)
                    .WithMany(p => p.PlaneModelCreatedbyNavigations)
                    .HasForeignKey(d => d.Createdby)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PLANEMODEL_CREATEUSER");

                entity.HasOne(d => d.DeletedbyNavigation)
                    .WithMany(p => p.PlaneModelDeletedbyNavigations)
                    .HasForeignKey(d => d.Deletedby)
                    .HasConstraintName("FK_PLANEMODEL_DELETEUSER");

                entity.HasOne(d => d.Make)
                    .WithMany(p => p.PlaneModels)
                    .HasForeignKey(d => d.Makeid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PLANEMODEL_PLANEMAKE");

                entity.HasOne(d => d.ModifiedbyNavigation)
                    .WithMany(p => p.PlaneModelModifiedbyNavigations)
                    .HasForeignKey(d => d.Modifiedby)
                    .HasConstraintName("FK_PLANEMODEL_MODIFIEDUSER");
            });

            modelBuilder.Entity<PlaneModelsLog>(entity =>
            {
                entity.ToTable("plane_models_log");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Action)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("action");

                entity.Property(e => e.Createdby).HasColumnName("createdby");

                entity.Property(e => e.Createddate)
                    .HasColumnType("datetime")
                    .HasColumnName("createddate");

                entity.Property(e => e.Deletedby).HasColumnName("deletedby");

                entity.Property(e => e.Deleteddate)
                    .HasColumnType("datetime")
                    .HasColumnName("deleteddate");

                entity.Property(e => e.Makeid).HasColumnName("makeid");

                entity.Property(e => e.Modifiedby).HasColumnName("modifiedby");

                entity.Property(e => e.Modifieddate)
                    .HasColumnType("datetime")
                    .HasColumnName("modifieddate");

                entity.Property(e => e.Name)
                    .HasMaxLength(128)
                    .HasColumnName("name");

                entity.Property(e => e.Planemodelid).HasColumnName("planemodelid");

                entity.Property(e => e.Status)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .HasColumnName("status")
                    .IsFixedLength();

                entity.HasOne(d => d.CreatedbyNavigation)
                    .WithMany(p => p.PlaneModelsLogCreatedbyNavigations)
                    .HasForeignKey(d => d.Createdby)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PLANEMODELLOG_CREATEUSER");

                entity.HasOne(d => d.DeletedbyNavigation)
                    .WithMany(p => p.PlaneModelsLogDeletedbyNavigations)
                    .HasForeignKey(d => d.Deletedby)
                    .HasConstraintName("FK_PLANEMODELLOG_DELETEUSER");

                entity.HasOne(d => d.Make)
                    .WithMany(p => p.PlaneModelsLogs)
                    .HasForeignKey(d => d.Makeid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PLANEMODELLOG_PLANEMAKE");

                entity.HasOne(d => d.ModifiedbyNavigation)
                    .WithMany(p => p.PlaneModelsLogModifiedbyNavigations)
                    .HasForeignKey(d => d.Modifiedby)
                    .HasConstraintName("FK_PLANEMODELLOG_MODIFIEDUSER");

                entity.HasOne(d => d.Planemodel)
                    .WithMany(p => p.PlaneModelsLogs)
                    .HasForeignKey(d => d.Planemodelid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PLANEMODELLOG_PLANEMODEL");
            });

            modelBuilder.Entity<PlaneSpotting>(entity =>
            {
                entity.ToTable("plane_spottings");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Createdby).HasColumnName("createdby");

                entity.Property(e => e.Createddate)
                    .HasColumnType("datetime")
                    .HasColumnName("createddate");

                entity.Property(e => e.Date)
                    .HasColumnType("datetime")
                    .HasColumnName("date");

                entity.Property(e => e.Deletedby).HasColumnName("deletedby");

                entity.Property(e => e.Deleteddate)
                    .HasColumnType("datetime")
                    .HasColumnName("deleteddate");

                entity.Property(e => e.Image)
                    .HasMaxLength(50)
                    .HasColumnName("image")
                    .IsFixedLength();

                entity.Property(e => e.Location)
                    .HasMaxLength(255)
                    .HasColumnName("location");

                entity.Property(e => e.Modifiedby).HasColumnName("modifiedby");

                entity.Property(e => e.Modifieddate)
                    .HasColumnType("datetime")
                    .HasColumnName("modifieddate");

                entity.Property(e => e.Planeid).HasColumnName("planeid");

                entity.Property(e => e.Status)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .HasColumnName("status")
                    .IsFixedLength();

                entity.HasOne(d => d.CreatedbyNavigation)
                    .WithMany(p => p.PlaneSpottingCreatedbyNavigations)
                    .HasForeignKey(d => d.Createdby)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PLANESPOTTING_CREATEUSER");

                entity.HasOne(d => d.DeletedbyNavigation)
                    .WithMany(p => p.PlaneSpottingDeletedbyNavigations)
                    .HasForeignKey(d => d.Deletedby)
                    .HasConstraintName("FK_PLANESPOTTING_DELETEUSER");

                entity.HasOne(d => d.ModifiedbyNavigation)
                    .WithMany(p => p.PlaneSpottingModifiedbyNavigations)
                    .HasForeignKey(d => d.Modifiedby)
                    .HasConstraintName("FK_PLANESPOTTING_MODIFIEDUSER");

                entity.HasOne(d => d.Plane)
                    .WithMany(p => p.PlaneSpottings)
                    .HasForeignKey(d => d.Planeid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PLANESPOTTING_PLANE");
            });

            modelBuilder.Entity<PlaneSpottingsLog>(entity =>
            {
                entity.ToTable("plane_spottings_logs");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Action)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("action");

                entity.Property(e => e.Createdby).HasColumnName("createdby");

                entity.Property(e => e.Createddate)
                    .HasColumnType("datetime")
                    .HasColumnName("createddate");

                entity.Property(e => e.Date)
                    .HasColumnType("datetime")
                    .HasColumnName("date");

                entity.Property(e => e.Deletedby).HasColumnName("deletedby");

                entity.Property(e => e.Deleteddate)
                    .HasColumnType("datetime")
                    .HasColumnName("deleteddate");

                entity.Property(e => e.Image)
                    .HasMaxLength(50)
                    .HasColumnName("image")
                    .IsFixedLength();

                entity.Property(e => e.Location)
                    .HasMaxLength(255)
                    .HasColumnName("location");

                entity.Property(e => e.Modifiedby).HasColumnName("modifiedby");

                entity.Property(e => e.Modifieddate)
                    .HasColumnType("datetime")
                    .HasColumnName("modifieddate");

                entity.Property(e => e.Planeid).HasColumnName("planeid");

                entity.Property(e => e.Planespottingid).HasColumnName("planespottingid");

                entity.Property(e => e.Status)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .HasColumnName("status")
                    .IsFixedLength();

                entity.HasOne(d => d.CreatedbyNavigation)
                    .WithMany(p => p.PlaneSpottingsLogCreatedbyNavigations)
                    .HasForeignKey(d => d.Createdby)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PLANESPOTTINGLOG_CREATEUSER");

                entity.HasOne(d => d.DeletedbyNavigation)
                    .WithMany(p => p.PlaneSpottingsLogDeletedbyNavigations)
                    .HasForeignKey(d => d.Deletedby)
                    .HasConstraintName("FK_PLANESPOTTINGLOG_DELETEUSER");

                entity.HasOne(d => d.ModifiedbyNavigation)
                    .WithMany(p => p.PlaneSpottingsLogModifiedbyNavigations)
                    .HasForeignKey(d => d.Modifiedby)
                    .HasConstraintName("FK_PLANESPOTTINGLOG_MODIFIEDUSER");

                entity.HasOne(d => d.Plane)
                    .WithMany(p => p.PlaneSpottingsLogs)
                    .HasForeignKey(d => d.Planeid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PLANESPOTTINGLOG_PLANE");

                entity.HasOne(d => d.Planespotting)
                    .WithMany(p => p.PlaneSpottingsLogs)
                    .HasForeignKey(d => d.Planespottingid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PLANESPOTTINGLOG_PLANESPOTTING");
            });

            modelBuilder.Entity<PlanesLog>(entity =>
            {
                entity.ToTable("planes_log");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Action)
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("action");

                entity.Property(e => e.Createdby).HasColumnName("createdby");

                entity.Property(e => e.Createddate)
                    .HasColumnType("datetime")
                    .HasColumnName("createddate");

                entity.Property(e => e.Deletedby).HasColumnName("deletedby");

                entity.Property(e => e.Deleteddate)
                    .HasColumnType("datetime")
                    .HasColumnName("deleteddate");

                entity.Property(e => e.Image)
                    .HasMaxLength(50)
                    .HasColumnName("image")
                    .IsFixedLength();

                entity.Property(e => e.Makeid).HasColumnName("makeid");

                entity.Property(e => e.Modelid).HasColumnName("modelid");

                entity.Property(e => e.Modifiedby).HasColumnName("modifiedby");

                entity.Property(e => e.Modifieddate)
                    .HasColumnType("datetime")
                    .HasColumnName("modifieddate");

                entity.Property(e => e.Planeid).HasColumnName("planeid");

                entity.Property(e => e.Reference)
                    .HasMaxLength(8)
                    .HasColumnName("reference");

                entity.Property(e => e.Referenceprefix)
                    .HasMaxLength(2)
                    .HasColumnName("referenceprefix");

                entity.Property(e => e.Referencesuffix)
                    .HasMaxLength(5)
                    .HasColumnName("referencesuffix");

                entity.Property(e => e.Status)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .HasColumnName("status")
                    .IsFixedLength();

                entity.HasOne(d => d.CreatedbyNavigation)
                    .WithMany(p => p.PlanesLogCreatedbyNavigations)
                    .HasForeignKey(d => d.Createdby)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PLANELOG_CREATEUSER");

                entity.HasOne(d => d.DeletedbyNavigation)
                    .WithMany(p => p.PlanesLogDeletedbyNavigations)
                    .HasForeignKey(d => d.Deletedby)
                    .HasConstraintName("FK_PLANELOG_DELETEUSER");

                entity.HasOne(d => d.Make)
                    .WithMany(p => p.PlanesLogs)
                    .HasForeignKey(d => d.Makeid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PLANELOG_PLANEMAKE");

                entity.HasOne(d => d.Model)
                    .WithMany(p => p.PlanesLogs)
                    .HasForeignKey(d => d.Modelid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PLANELOG_PLANEMODEL");

                entity.HasOne(d => d.ModifiedbyNavigation)
                    .WithMany(p => p.PlanesLogModifiedbyNavigations)
                    .HasForeignKey(d => d.Modifiedby)
                    .HasConstraintName("FK_PLANELOG_MODIFIEDUSER");

                entity.HasOne(d => d.Plane)
                    .WithMany(p => p.PlanesLogs)
                    .HasForeignKey(d => d.Planeid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PLANELOG_PLANE");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");

                entity.HasIndex(e => e.Email, "UQ__users__AB6E6164BA5A553F")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Createdby).HasColumnName("createdby");

                entity.Property(e => e.Createddate)
                    .HasColumnType("datetime")
                    .HasColumnName("createddate");

                entity.Property(e => e.Deletedby).HasColumnName("deletedby");

                entity.Property(e => e.Deleteddate)
                    .HasColumnType("datetime")
                    .HasColumnName("deleteddate");

                entity.Property(e => e.Email)
                    .HasMaxLength(500)
                    .HasColumnName("email");

                entity.Property(e => e.Modifiedby).HasColumnName("modifiedby");

                entity.Property(e => e.Modifieddate)
                    .HasColumnType("datetime")
                    .HasColumnName("modifieddate");

                entity.Property(e => e.Name)
                    .HasMaxLength(128)
                    .HasColumnName("name");

                entity.Property(e => e.Password).HasColumnName("password");

                entity.Property(e => e.Status)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .HasColumnName("status")
                    .IsFixedLength();

                entity.Property(e => e.Usertypeid).HasColumnName("usertypeid");

                entity.HasOne(d => d.CreatedbyNavigation)
                    .WithMany(p => p.InverseCreatedbyNavigation)
                    .HasForeignKey(d => d.Createdby)
                    .HasConstraintName("FK_USERS_CREATEUSER");

                entity.HasOne(d => d.DeletedbyNavigation)
                    .WithMany(p => p.InverseDeletedbyNavigation)
                    .HasForeignKey(d => d.Deletedby)
                    .HasConstraintName("FK_USERS_DELETEUSER");

                entity.HasOne(d => d.ModifiedbyNavigation)
                    .WithMany(p => p.InverseModifiedbyNavigation)
                    .HasForeignKey(d => d.Modifiedby)
                    .HasConstraintName("FK_USERS_MODIFIEDUSER");

                entity.HasOne(d => d.Usertype)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.Usertypeid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_USERS_USERTYPE");
            });

            modelBuilder.Entity<UserType>(entity =>
            {
                entity.ToTable("user_types");

                entity.HasIndex(e => e.Name, "UQ__user_typ__72E12F1B53427A72")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .HasMaxLength(128)
                    .HasColumnName("name");

                entity.Property(e => e.Status)
                    .HasMaxLength(1)
                    .IsUnicode(false)
                    .HasColumnName("status")
                    .IsFixedLength();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);




        public async Task<List<UserList>> SearchUsersList(Data.RequestModels.User.SearchUser request)
        {

            SqlParameter[] parameters = new SqlParameter[2];

            SqlParameter searchtextparam = new SqlParameter("@SearchText", SqlDbType.NVarChar);
            searchtextparam.Value = !String.IsNullOrEmpty(request.searchtext) ? request.searchtext : DBNull.Value;
            searchtextparam.IsNullable = true;
            parameters[0] = searchtextparam;

            SqlParameter usertypeidparam = new SqlParameter("@UserType", SqlDbType.Int);
            usertypeidparam.Value = request.usertypeid.HasValue? request.usertypeid.Value:DBNull.Value;
            usertypeidparam.IsNullable = true;
            parameters[1] = usertypeidparam;

            List<UserList> searchusers = await this.UserList.FromSqlRaw("EXEC dbo.spSearchUserList @SearchText, @UserType", parameters).ToListAsync();
            return searchusers;
        }


        public async Task<List<PlaneMakeList>> SearchPlaneMakeList(Data.RequestModels.PlaneMake.SearchPlaneMake request)
        {

            SqlParameter[] parameters = new SqlParameter[1];

            SqlParameter searchtextparam = new SqlParameter("@SearchText", SqlDbType.NVarChar);
            searchtextparam.Value = !String.IsNullOrEmpty(request.searchtext) ? request.searchtext : DBNull.Value;
            searchtextparam.IsNullable = true;
            parameters[0] = searchtextparam;

            List<PlaneMakeList> searchplanemake = await this.PlaneMakeList.FromSqlRaw("EXEC dbo.spSearchPlaneMakeList @SearchText", parameters).ToListAsync();
            return searchplanemake;
        }


        public async Task<List<PlaneModelList>> SearchPlaneModelList(Data.RequestModels.PlaneModel.SearchPlaneModel request)
        {

            SqlParameter[] parameters = new SqlParameter[2];

            SqlParameter searchtextparam = new SqlParameter("@SearchText", SqlDbType.NVarChar);
            searchtextparam.Value = !String.IsNullOrEmpty(request.searchtext) ? request.searchtext : DBNull.Value;
            searchtextparam.IsNullable = true;
            parameters[0] = searchtextparam;

            SqlParameter makeidparam = new SqlParameter("@MakeID", SqlDbType.Int);
            makeidparam.Value = request.makeid.HasValue ? request.makeid.Value : DBNull.Value;
            makeidparam.IsNullable = true;
            parameters[1] = makeidparam;

            List<PlaneModelList> searchplanemodel = await this.PlaneModelList.FromSqlRaw("EXEC dbo.spSearchPlaneModelList @SearchText, @MakeID", parameters).ToListAsync();
            return searchplanemodel;
        }


        public async Task<List<PlaneList>> SearchPlaneList(Data.RequestModels.Plane.SearchPlane request)
        {

            SqlParameter[] parameters = new SqlParameter[3];

            SqlParameter searchtextparam = new SqlParameter("@SearchText", SqlDbType.NVarChar);
            searchtextparam.Value = !String.IsNullOrEmpty(request.searchtext) ? request.searchtext : DBNull.Value;
            searchtextparam.IsNullable = true;
            parameters[0] = searchtextparam;

            SqlParameter makeidparam = new SqlParameter("@MakeID", SqlDbType.Int);
            makeidparam.Value = request.makeid.HasValue ? request.makeid.Value : DBNull.Value;
            makeidparam.IsNullable = true;
            parameters[1] = makeidparam;

            SqlParameter modelparam = new SqlParameter("@ModelID", SqlDbType.Int);
            modelparam.Value = request.modelid.HasValue ? request.modelid.Value : DBNull.Value;
            modelparam.IsNullable = true;
            parameters[2] = modelparam;

            List<PlaneList> searchplane = await this.PlaneList.FromSqlRaw("EXEC dbo.spSearchPlaneList @SearchText, @MakeID, @ModelID", parameters).ToListAsync();
            return searchplane;
        }


        public async Task<List<PlaneSpottingList>> SearchPlaneSpottingList(Data.RequestModels.PlaneSpotting.SearchPlaneSpotting request)
        {

            SqlParameter[] parameters = new SqlParameter[6];

            SqlParameter searchtextparam = new SqlParameter("@SearchText", SqlDbType.NVarChar);
            searchtextparam.Value = !String.IsNullOrEmpty(request.searchtext) ? request.searchtext : DBNull.Value;
            searchtextparam.IsNullable = true;
            parameters[0] = searchtextparam;

            SqlParameter makeidparam = new SqlParameter("@MakeID", SqlDbType.Int);
            makeidparam.Value = request.makeid.HasValue ? request.makeid.Value : DBNull.Value;
            makeidparam.IsNullable = true;
            parameters[1] = makeidparam;

            SqlParameter modelparam = new SqlParameter("@ModelID", SqlDbType.Int);
            modelparam.Value = request.modelid.HasValue ? request.modelid.Value : DBNull.Value;
            modelparam.IsNullable = true;
            parameters[2] = modelparam;

            SqlParameter planeparam = new SqlParameter("@PlaneID", SqlDbType.Int);
            planeparam.Value = request.planeid.HasValue ? request.planeid.Value : DBNull.Value;
            planeparam.IsNullable = true;
            parameters[3] = planeparam;

            SqlParameter fromdateparam = new SqlParameter("@FromDate", SqlDbType.DateTime);
            fromdateparam.Value = request.fromdate.HasValue ? request.fromdate.Value : DBNull.Value;
            fromdateparam.IsNullable = true;
            parameters[4] = fromdateparam;

            SqlParameter todateparam = new SqlParameter("@ToDate", SqlDbType.DateTime);
            todateparam.Value = request.todate.HasValue ? request.todate.Value : DBNull.Value;
            todateparam.IsNullable = true;
            parameters[5] = todateparam;

            List<PlaneSpottingList> searchplanespottings = await this.PlaneSpottingList.FromSqlRaw("EXEC dbo.spSearchPlaneSpottingList @SearchText, @MakeID, @ModelID, @PlaneID, @FromDate, @ToDate", parameters).ToListAsync();
            return searchplanespottings;
        }


        public async Task<List<RecentPlaneSpottings>> GetRecentPlaneSpottings(Data.RequestModels.PlaneSpotting.RecentPlaneSpotting request)
        {

            SqlParameter[] parameters = new SqlParameter[1];

            SqlParameter paramcount = new SqlParameter("@Counts", SqlDbType.Int);
            paramcount.Value = request.count;
            paramcount.IsNullable = true;
            parameters[0] = paramcount;

            List<RecentPlaneSpottings> searchplanespottings = await this.RecentPlaneSpottings.FromSqlRaw("EXEC dbo.spGetRecentPlaneSpottingList @Counts", parameters).ToListAsync();
            return searchplanespottings;
        }
        public async Task<List<PlaneSpottingStat>> GetPlaneSpottingsListStat(Data.RequestModels.PlaneSpotting.StatPlaneSpotting request)
        {

            SqlParameter[] parameters = new SqlParameter[2];

            SqlParameter paramafrom = new SqlParameter("@FromDate", SqlDbType.Date);
            paramafrom.Value = request.fromdate;
            paramafrom.IsNullable = true;
            parameters[0] = paramafrom;

            SqlParameter paramto = new SqlParameter("@ToDate", SqlDbType.Date);
            paramto.Value = request.todate;
            paramto.IsNullable = true;
            parameters[1] = paramto;

            List<PlaneSpottingStat> searchplanespottings = await this.PlaneSpottingStat.FromSqlRaw("EXEC dbo.spGetPlaneSpottingListStat @FromDate, @ToDate", parameters).ToListAsync();
            return searchplanespottings;
        }
    }
}
