using Data.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class PlaneSpottingBo
    {


        public IConfiguration configuration { get; }
        public PlaneSpottingBo(IConfiguration configuration)
        {
            this.configuration = configuration;
        }



        public Data.ResponseModels.APIReponseDetails CreatePlaneSpotting(Data.RequestModels.PlaneSpotting.CreatePlaneSpotting request, Data.ResponseModels.LoginDetails loggedinuser)
        {
            using (var db = new PSAContext(configuration))
            {
                Data.ResponseModels.APIReponseDetails apiresponse = new Data.ResponseModels.APIReponseDetails();

                var validateobj = db.PlaneSpottings.Where(a => a.Location == request.location && a.Date==request.date && a.Status == "A").ToList();

                if (validateobj.Count == 0)
                {
                    DateTime currentdatetime = DateTime.Now;

                    Data.Models.PlaneSpotting obj = new Data.Models.PlaneSpotting();
                    obj.Planeid = request.planeid;
                    obj.Location = request.location;
                    obj.Date = request.date;
                    obj.Image = Convert.FromBase64String(request.image);
                    obj.Status = "A";
                    obj.Createdby = loggedinuser.id;
                    obj.Createddate = currentdatetime;
                    var createdobj = db.PlaneSpottings.Add(obj);
                    db.SaveChanges();


                    Data.Models.PlaneSpottingsLog objlog = new Data.Models.PlaneSpottingsLog();
                    objlog.Planespottingid = obj.Id;
                    objlog.Planeid = request.planeid;
                    objlog.Location = request.location;
                    objlog.Date = request.date;
                    objlog.Image = Convert.FromBase64String(request.image);
                    objlog.Status = "A";
                    objlog.Action = "Created";
                    objlog.Createdby = loggedinuser.id;
                    objlog.Createddate = currentdatetime;
                    var createdobjlog = db.PlaneSpottingsLogs.Add(objlog);
                    db.SaveChanges();


                    apiresponse.code = 1;
                    apiresponse.message = "Plane spotting added successful!";
                }
                else
                {
                    apiresponse.code = 99;
                    apiresponse.message = "Plane spotting has been already added!";
                }
                return apiresponse;
            }
        }

        public Data.ResponseModels.APIReponseDetails UpdatePlaneSpotting(Data.RequestModels.PlaneSpotting.UpdatePlaneSpotting request, Data.ResponseModels.LoginDetails loggedinuser)
        {
            using (var db = new PSAContext(configuration))
            {
                Data.ResponseModels.APIReponseDetails apiresponse = new Data.ResponseModels.APIReponseDetails();

                var validateobj = db.PlaneSpottings.Where(a => a.Id == request.planespottingid && a.Status == "A").ToList();

                if (validateobj.Count > 0)
                {
                    DateTime currentdatetime = DateTime.Now;

                    Data.Models.PlaneSpotting obj = validateobj.ElementAt(0);
                    obj.Planeid = request.planeid;
                    obj.Location = request.location;
                    obj.Date = request.date;
                    obj.Status = "A";
                    obj.Modifiedby = loggedinuser.id;
                    obj.Modifieddate = currentdatetime;
                    var modifiedobj = db.PlaneSpottings.Update(obj);
                    db.SaveChanges();

                    Data.Models.PlaneSpottingsLog objlog = new Data.Models.PlaneSpottingsLog();
                    objlog.Planespottingid = obj.Id;
                    objlog.Planeid = request.planeid;
                    objlog.Location = request.location;
                    objlog.Date = request.date;
                    objlog.Image = Convert.FromBase64String(request.image);
                    objlog.Status = "A";
                    objlog.Action = "Modified";
                    objlog.Createdby = obj.Createdby;
                    objlog.Createddate = obj.Createddate;
                    objlog.Modifiedby = loggedinuser.id;
                    objlog.Modifieddate = currentdatetime;
                    var modifiedobjlog = db.PlaneSpottingsLogs.Update(objlog);
                    db.SaveChanges();


                    apiresponse.code = 1;
                    apiresponse.message = "Plane spotting modification successful!";
                }
                else
                {
                    apiresponse.code = 99;
                    apiresponse.message = "Plane spotting modification unsuccessful!";
                }
                return apiresponse;
            }
        }

        public Data.ResponseModels.APIReponseDetails DeletePlaneSpotting(Data.RequestModels.PlaneSpotting.DeletePlaneSpotting request, Data.ResponseModels.LoginDetails loggedinuser)
        {
            using (var db = new PSAContext(configuration))
            {
                Data.ResponseModels.APIReponseDetails apiresponse = new Data.ResponseModels.APIReponseDetails();

                var validateobj = db.PlaneSpottings.Where(a => a.Id == request.planespottingid && a.Status == "A").ToList();

                if (validateobj.Count > 0)
                {
                    DateTime currentdatetime = DateTime.Now;

                    Data.Models.PlaneSpotting obj = validateobj.ElementAt(0);
                    obj.Status = "D";
                    obj.Deletedby = loggedinuser.id;
                    obj.Deleteddate = currentdatetime;
                    var modifiedobj = db.PlaneSpottings.Update(obj);
                    db.SaveChanges();

                    Data.Models.PlaneSpottingsLog objlog = new Data.Models.PlaneSpottingsLog();
                    objlog.Planespottingid = obj.Id;
                    objlog.Planeid = obj.Planeid;
                    objlog.Location = obj.Location;
                    objlog.Date = obj.Date;
                    objlog.Image = obj.Image;
                    objlog.Status = "A";
                    objlog.Action = "Deleted";
                    objlog.Createdby = obj.Createdby;
                    objlog.Createddate = obj.Createddate;
                    objlog.Modifiedby = obj.Modifiedby;
                    objlog.Modifieddate = obj.Modifieddate;
                    objlog.Deletedby = loggedinuser.id;
                    objlog.Deleteddate = currentdatetime;
                    var modifiedobjlog = db.PlaneSpottingsLogs.Update(objlog);
                    db.SaveChanges();




                    apiresponse.code = 1;
                    apiresponse.message = "Plane spotting deletion successful!";
                }
                else
                {
                    apiresponse.code = 99;
                    apiresponse.message = "Plane spotting deletion unsuccessful!";
                }
                return apiresponse;
            }
        }


        public List<Data.Models.PlaneSpottingList> SearchPlaneSpottings(Data.RequestModels.PlaneSpotting.SearchPlaneSpotting request)
        {
            using (var db = new PSAContext(configuration))
            {
                List<Data.Models.PlaneSpottingList> spottinglist = new List<Data.Models.PlaneSpottingList>();


                spottinglist = db.SearchPlaneSpottingList(request).Result;
                return spottinglist;
            }
        }


        public List<Data.Models.RecentPlaneSpottings> GetRecentPlaneSpottings(Data.RequestModels.PlaneSpotting.RecentPlaneSpotting request)
        {
            using (var db = new PSAContext(configuration))
            {
                List<Data.Models.RecentPlaneSpottings> spottinglist = new List<Data.Models.RecentPlaneSpottings>();


                spottinglist = db.GetRecentPlaneSpottings(request).Result;
                return spottinglist;
            }
        }

        public List<Data.Models.PlaneSpottingStat> GetPlaneSpottingsListStat(Data.RequestModels.PlaneSpotting.StatPlaneSpotting request)
        {
            using (var db = new PSAContext(configuration))
            {
                List<Data.Models.PlaneSpottingStat> spottinglist = new List<Data.Models.PlaneSpottingStat>();

                spottinglist = db.GetPlaneSpottingsListStat(request).Result;
                return spottinglist;
            }
        }

        public List<Data.Models.PlaneSpottingStat> GetPlaneSpottingsListStatByPlane(Data.RequestModels.PlaneSpotting.StatPlaneSpotting request)
        {
            using (var db = new PSAContext(configuration))
            {

                var planeCount = db.PlaneSpottings.Where(x => x.Date.Date >= request.fromdate && x.Date.Date <= request.todate).GroupBy(x => x.Plane.Reference)
                    .Select(Reference => new PlaneSpottingStat
                    {
                        Value = Reference.Count(),
                        Type = Reference.Key
                    }).ToList();
                return planeCount;
            }
        }

        public List<Data.Models.PlaneSpottingStat> GetPlaneSpottingsListStatByModel(Data.RequestModels.PlaneSpotting.StatPlaneSpotting request)
        {
            using (var db = new PSAContext(configuration))
            {

                var planeModelCount = db.PlaneSpottings.Where(x => x.Date.Date >= request.fromdate && x.Date.Date <= request.todate).GroupBy(x => x.Plane.Model.Name)
                    .Select(Name => new PlaneSpottingStat
                    {
                        Value = Name.Count(),
                        Type = Name.Key
                    }).ToList();
                return planeModelCount;
            }
        }

        public List<Data.Models.PlaneSpottingStat> GetPlaneSpottingsListStatByMake(Data.RequestModels.PlaneSpotting.StatPlaneSpotting request)
        {
            using (var db = new PSAContext(configuration))
            {
                var planeMakeCount = db.PlaneSpottings.Where(x => x.Date.Date >= request.fromdate && x.Date.Date <= request.todate).GroupBy(x => x.Plane.Make.Name)
                    .Select(Name => new PlaneSpottingStat
                    {
                        Value = Name.Count(),
                        Type = Name.Key
                    }).ToList();
                return planeMakeCount;
            }
        }
    }
}
