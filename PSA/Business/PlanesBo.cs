using Data.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class PlanesBo
    {

        public IConfiguration configuration { get; }
        public PlanesBo(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public Data.ResponseModels.APIReponseDetails CreatePlaneMake(Data.RequestModels.PlaneMake.CreatePlaneMake request, Data.ResponseModels.LoginDetails loggedinuser)
        {
            using (var db = new PSAContext(configuration))
            {
                Data.ResponseModels.APIReponseDetails apiresponse = new Data.ResponseModels.APIReponseDetails();

                var validateobj = db.PlaneMakes.Where(a => a.Name == request.name && a.Status == "A").ToList();

                if (validateobj.Count == 0)
                {
                    DateTime currentdatetime = DateTime.Now;

                    Data.Models.PlaneMake obj = new Data.Models.PlaneMake();
                    obj.Name = request.name;
                    obj.Status = "A";
                    obj.Createdby = loggedinuser.id;
                    obj.Createddate = currentdatetime;
                    var createdobj = db.PlaneMakes.Add(obj);
                    db.SaveChanges();


                    Data.Models.PlaneMakesLog objlog = new Data.Models.PlaneMakesLog();
                    objlog.Planemakeid = obj.Id;
                    objlog.Name = request.name;
                    objlog.Status = "A";
                    objlog.Action = "Created";
                    objlog.Createdby = loggedinuser.id;
                    objlog.Createddate = currentdatetime;
                    var createdobjlog = db.PlaneMakesLogs.Add(objlog);
                    db.SaveChanges();


                    apiresponse.code = 1;
                    apiresponse.message = "Plane make added successful!";
                }
                else
                {
                    apiresponse.code = 99;
                    apiresponse.message = "Plane make has been already added!";
                }
                return apiresponse;
            }
        }

        public Data.ResponseModels.APIReponseDetails UpdatePlaneMakes(Data.RequestModels.PlaneMake.UpdatePlaneMake request, Data.ResponseModels.LoginDetails loggedinuser)
        {
            using (var db = new PSAContext(configuration))
            {
                Data.ResponseModels.APIReponseDetails apiresponse = new Data.ResponseModels.APIReponseDetails();

                var validateobjexist = db.PlaneMakes.Where(a => a.Id == request.makeid && a.Status == "A").ToList();

                if (validateobjexist.Count > 0)
                {
                    var validateobj = db.PlaneMakes.Where(a => a.Name == request.name && a.Id != request.makeid && a.Status == "A").ToList();

                    if (validateobjexist.Count == 0)
                    {
                        DateTime currentdatetime = DateTime.Now;

                        Data.Models.PlaneMake obj = validateobj.ElementAt(0);
                        obj.Name = request.name;
                        obj.Status = "A";
                        obj.Modifiedby = loggedinuser.id;
                        obj.Modifieddate = currentdatetime;
                        var modifiedobj = db.PlaneMakes.Update(obj);
                        db.SaveChanges();

                        Data.Models.PlaneMakesLog objlog = new Data.Models.PlaneMakesLog();
                        objlog.Planemakeid = obj.Id;
                        objlog.Name = request.name;
                        objlog.Status = "A";
                        objlog.Action = "Modified";
                        objlog.Createdby = obj.Createdby;
                        objlog.Createddate = obj.Createddate;
                        objlog.Modifiedby = loggedinuser.id;
                        objlog.Modifieddate = currentdatetime;
                        var modifiedobjlog = db.PlaneMakesLogs.Update(objlog);
                        db.SaveChanges();


                        apiresponse.code = 1;
                        apiresponse.message = "Plane make modification successful!";
                    }
                    else
                    {
                        apiresponse.code = 99;
                        apiresponse.message = "Plane make already exists!";
                    }
                }
                else
                {
                    apiresponse.code = 99;
                    apiresponse.message = "Plane make modification unsuccessful!";
                }
                return apiresponse;
            }
        }

        public Data.ResponseModels.APIReponseDetails DeletePlaneMakes(Data.RequestModels.PlaneMake.DeletePlaneMake request, Data.ResponseModels.LoginDetails loggedinuser)
        {
            using (var db = new PSAContext(configuration))
            {
                Data.ResponseModels.APIReponseDetails apiresponse = new Data.ResponseModels.APIReponseDetails();

                var validateobj = db.PlaneMakes.Where(a => a.Id == request.makeid && a.Status == "A").ToList();

                if (validateobj.Count > 0)
                {
                    DateTime currentdatetime = DateTime.Now;

                    Data.Models.PlaneMake obj = validateobj.ElementAt(0);
                    obj.Status = "D";
                    obj.Deletedby = loggedinuser.id;
                    obj.Deleteddate = currentdatetime;
                    var modifiedobj = db.PlaneMakes.Update(obj);
                    db.SaveChanges();

                    Data.Models.PlaneMakesLog objlog = new Data.Models.PlaneMakesLog();
                    objlog.Planemakeid = obj.Id;
                    objlog.Name = obj.Name;
                    objlog.Status = "A";
                    objlog.Action = "Deleted";
                    objlog.Createdby = obj.Createdby;
                    objlog.Createddate = obj.Createddate;
                    objlog.Modifiedby = obj.Modifiedby;
                    objlog.Modifieddate = obj.Modifieddate;
                    objlog.Deletedby = loggedinuser.id;
                    objlog.Deleteddate = currentdatetime;
                    var modifiedobjlog = db.PlaneMakesLogs.Update(objlog);
                    db.SaveChanges();




                    apiresponse.code = 1;
                    apiresponse.message = "Plane make deletion successful!";
                }
                else
                {
                    apiresponse.code = 99;
                    apiresponse.message = "Plane make deletion unsuccessful!";
                }
                return apiresponse;
            }
        }

        public List<Data.Models.PlaneMakeList> SearchPlaneMakes(Data.RequestModels.PlaneMake.SearchPlaneMake request)
        {
            using (var db = new PSAContext(configuration))
            {
                List<Data.Models.PlaneMakeList> planemakes = new List<Data.Models.PlaneMakeList>();


                planemakes = db.SearchPlaneMakeList(request).Result;
                return planemakes;
            }
        }



        public Data.ResponseModels.APIReponseDetails CreatePlaneModel(Data.RequestModels.PlaneModel.CreatePlaneModel request, Data.ResponseModels.LoginDetails loggedinuser)
        {
            using (var db = new PSAContext(configuration))
            {
                Data.ResponseModels.APIReponseDetails apiresponse = new Data.ResponseModels.APIReponseDetails();

                var validateobj = db.PlaneModels.Where(a => a.Name == request.name && a.Status == "A").ToList();

                if (validateobj.Count == 0)
                {
                    DateTime currentdatetime = DateTime.Now;

                    Data.Models.PlaneModel obj = new Data.Models.PlaneModel();
                    obj.Name = request.name;
                    obj.Makeid = request.makeid;
                    obj.Status = "A";
                    obj.Createdby = loggedinuser.id;
                    obj.Createddate = currentdatetime;
                    var createdobj = db.PlaneModels.Add(obj);
                    db.SaveChanges();


                    Data.Models.PlaneModelsLog objlog = new Data.Models.PlaneModelsLog();
                    objlog.Planemodelid = obj.Id;
                    objlog.Name = request.name;
                    objlog.Makeid = request.makeid;
                    objlog.Status = "A";
                    objlog.Action = "Created";
                    objlog.Createdby = loggedinuser.id;
                    objlog.Createddate = currentdatetime;
                    var createdobjlog = db.PlaneModelsLogs.Add(objlog);
                    db.SaveChanges();


                    apiresponse.code = 1;
                    apiresponse.message = "Plane model added successful!";
                }
                else
                {
                    apiresponse.code = 99;
                    apiresponse.message = "Plane model has been already added!";
                }
                return apiresponse;
            }
        }

        public Data.ResponseModels.APIReponseDetails UpdatePlaneModels(Data.RequestModels.PlaneModel.UpdatePlaneModel request, Data.ResponseModels.LoginDetails loggedinuser)
        {
            using (var db = new PSAContext(configuration))
            {
                Data.ResponseModels.APIReponseDetails apiresponse = new Data.ResponseModels.APIReponseDetails();

                var validateobjexist = db.PlaneModels.Where(a => a.Id == request.modelid && a.Status == "A").ToList();
                if (validateobjexist.Count > 0)
                {
                    var validateobj = db.PlaneModels.Where(a => a.Name == request.name && a.Id != request.modelid && a.Status == "A").ToList();

                    if (validateobjexist.Count == 0)
                    {
                        DateTime currentdatetime = DateTime.Now;

                        Data.Models.PlaneModel obj = validateobj.ElementAt(0);
                        obj.Name = request.name;
                        obj.Makeid = request.makeid;
                        obj.Status = "A";
                        obj.Modifiedby = loggedinuser.id;
                        obj.Modifieddate = currentdatetime;
                        var modifiedobj = db.PlaneModels.Update(obj);
                        db.SaveChanges();

                        Data.Models.PlaneModelsLog objlog = new Data.Models.PlaneModelsLog();
                        objlog.Planemodelid = obj.Id;
                        objlog.Name = request.name;
                        objlog.Makeid = request.makeid;
                        objlog.Status = "A";
                        objlog.Action = "Modified";
                        objlog.Createdby = obj.Createdby;
                        objlog.Createddate = obj.Createddate;
                        objlog.Modifiedby = loggedinuser.id;
                        objlog.Modifieddate = currentdatetime;
                        var modifiedobjlog = db.PlaneModelsLogs.Update(objlog);
                        db.SaveChanges();


                        apiresponse.code = 1;
                        apiresponse.message = "Plane model modification successful!";
                    }
                    else
                    {
                        apiresponse.code = 99;
                        apiresponse.message = "Plane model already exists!";
                    }
                }
                else
                {
                    apiresponse.code = 99;
                    apiresponse.message = "Plane model modification unsuccessful!";
                }
                return apiresponse;
            }
        }

        public Data.ResponseModels.APIReponseDetails DeletePlaneModels(Data.RequestModels.PlaneModel.DeletePlaneModel request, Data.ResponseModels.LoginDetails loggedinuser)
        {
            using (var db = new PSAContext(configuration))
            {
                Data.ResponseModels.APIReponseDetails apiresponse = new Data.ResponseModels.APIReponseDetails();

                var validateobj = db.PlaneModels.Where(a => a.Id == request.modelid && a.Status == "A").ToList();

                if (validateobj.Count > 0)
                {
                    DateTime currentdatetime = DateTime.Now;

                    Data.Models.PlaneModel obj = validateobj.ElementAt(0);
                    obj.Status = "D";
                    obj.Deletedby = loggedinuser.id;
                    obj.Deleteddate = currentdatetime;
                    var modifiedobj = db.PlaneModels.Update(obj);
                    db.SaveChanges();

                    Data.Models.PlaneModelsLog objlog = new Data.Models.PlaneModelsLog();
                    objlog.Planemodelid = obj.Id;
                    objlog.Name = obj.Name;
                    objlog.Makeid = obj.Makeid;
                    objlog.Status = "A";
                    objlog.Action = "Deleted";
                    objlog.Createdby = obj.Createdby;
                    objlog.Createddate = obj.Createddate;
                    objlog.Modifiedby = obj.Modifiedby;
                    objlog.Modifieddate = obj.Modifieddate;
                    objlog.Deletedby = loggedinuser.id;
                    objlog.Deleteddate = currentdatetime;
                    var modifiedobjlog = db.PlaneModelsLogs.Update(objlog);
                    db.SaveChanges();




                    apiresponse.code = 1;
                    apiresponse.message = "Plane model deletion successful!";
                }
                else
                {
                    apiresponse.code = 99;
                    apiresponse.message = "Plane model deletion unsuccessful!";
                }
                return apiresponse;
            }
        }

        public List<Data.Models.PlaneModelList> SearchPlaneModels(Data.RequestModels.PlaneModel.SearchPlaneModel request)
        {
            using (var db = new PSAContext(configuration))
            {
                List<Data.Models.PlaneModelList> planemodels = new List<Data.Models.PlaneModelList>();


                planemodels = db.SearchPlaneModelList(request).Result;
                return planemodels;
            }
        }


        public Data.ResponseModels.APIReponseDetails CreatePlane(Data.RequestModels.Plane.CreatePlane request, Data.ResponseModels.LoginDetails loggedinuser)
        {
            using (var db = new PSAContext(configuration))
            {
                Data.ResponseModels.APIReponseDetails apiresponse = new Data.ResponseModels.APIReponseDetails();

                var validateobj = db.Planes.Where(a => a.Reference == request.referenceprefix + "-" + request.referencesuffix && a.Status == "A").ToList();

                if (validateobj.Count == 0)
                {
                    DateTime currentdatetime = DateTime.Now;

                    Data.Models.Plane obj = new Data.Models.Plane();
                    obj.Makeid = request.makeid;
                    obj.Modelid = request.modelid;
                    obj.Image = Convert.FromBase64String(request.image);
                    obj.Reference = request.referenceprefix+"-"+ request.referencesuffix;
                    obj.Referenceprefix = request.referenceprefix;
                    obj.Referencesuffix = request.referencesuffix;
                    obj.Status = "A";
                    obj.Createdby = loggedinuser.id;
                    obj.Createddate = currentdatetime;
                    var createdobj = db.Planes.Add(obj);
                    db.SaveChanges();


                    Data.Models.PlanesLog objlog = new Data.Models.PlanesLog();
                    objlog.Planeid = obj.Id;
                    objlog.Makeid = request.makeid;
                    objlog.Modelid = request.modelid;
                    objlog.Image = Convert.FromBase64String(request.image);
                    objlog.Reference = request.referenceprefix + "-" + request.referencesuffix;
                    objlog.Referenceprefix = request.referenceprefix;
                    objlog.Referencesuffix = request.referencesuffix;
                    objlog.Status = "A";
                    objlog.Action = "Created";
                    objlog.Createdby = loggedinuser.id;
                    objlog.Createddate = currentdatetime;
                    var createdobjlog = db.PlanesLogs.Add(objlog);
                    db.SaveChanges();


                    apiresponse.code = 1;
                    apiresponse.message = "Plane added successful!";
                }
                else
                {
                    apiresponse.code = 99;
                    apiresponse.message = "Plane has been already added!";
                }
                return apiresponse;
            }
        }

        public Data.ResponseModels.APIReponseDetails UpdatePlanes(Data.RequestModels.Plane.UpdatePlane request, Data.ResponseModels.LoginDetails loggedinuser)
        {
            using (var db = new PSAContext(configuration))
            {
                Data.ResponseModels.APIReponseDetails apiresponse = new Data.ResponseModels.APIReponseDetails();

                var validateobjexist = db.Planes.Where(a => a.Id == request.planeid && a.Status == "A").ToList();

                if (validateobjexist.Count > 0)
                {
                    var validateobj = db.Planes.Where(a => a.Reference == request.referenceprefix + "-" + request.referencesuffix && a.Id != request.planeid && a.Status == "A").ToList();

                    if (validateobjexist.Count == 0)
                    {
                        DateTime currentdatetime = DateTime.Now;

                        Data.Models.Plane obj = validateobj.ElementAt(0);
                        obj.Makeid = request.makeid;
                        obj.Modelid = request.modelid;
                        obj.Image = Convert.FromBase64String(request.image);
                        obj.Reference = request.referenceprefix + "-" + request.referencesuffix;
                        obj.Referenceprefix = request.referenceprefix;
                        obj.Referencesuffix = request.referencesuffix;
                        obj.Status = "A";
                        obj.Modifiedby = loggedinuser.id;
                        obj.Modifieddate = currentdatetime;
                        var modifiedobj = db.Planes.Update(obj);
                        db.SaveChanges();

                        Data.Models.PlanesLog objlog = new Data.Models.PlanesLog();
                        objlog.Planeid = obj.Id;
                        objlog.Makeid = request.makeid;
                        objlog.Modelid = request.modelid;
                        objlog.Image = Convert.FromBase64String(request.image);
                        objlog.Reference = request.referenceprefix + "-" + request.referencesuffix;
                        objlog.Referenceprefix = request.referenceprefix;
                        objlog.Referencesuffix = request.referencesuffix;
                        objlog.Status = "A";
                        objlog.Action = "Modified";
                        objlog.Createdby = obj.Createdby;
                        objlog.Createddate = obj.Createddate;
                        objlog.Modifiedby = loggedinuser.id;
                        objlog.Modifieddate = currentdatetime;
                        var modifiedobjlog = db.PlanesLogs.Update(objlog);
                        db.SaveChanges();


                        apiresponse.code = 1;
                        apiresponse.message = "Plane modification successful!";
                    }
                    else
                    {
                        apiresponse.code = 99;
                        apiresponse.message = "Plane already exists!";
                    }
                }
                else
                {
                    apiresponse.code = 99;
                    apiresponse.message = "Plane modification unsuccessful!";
                }
                return apiresponse;
            }
        }

        public Data.ResponseModels.APIReponseDetails DeletePlanes(Data.RequestModels.Plane.DeletePlane request, Data.ResponseModels.LoginDetails loggedinuser)
        {
            using (var db = new PSAContext(configuration))
            {
                Data.ResponseModels.APIReponseDetails apiresponse = new Data.ResponseModels.APIReponseDetails();

                var validateobj = db.Planes.Where(a => a.Id == request.planeid && a.Status == "A").ToList();

                if (validateobj.Count > 0)
                {
                    DateTime currentdatetime = DateTime.Now;

                    Data.Models.Plane obj = validateobj.ElementAt(0);
                    obj.Status = "D";
                    obj.Deletedby = loggedinuser.id;
                    obj.Deleteddate = currentdatetime;
                    var modifiedobj = db.Planes.Update(obj);
                    db.SaveChanges();

                    Data.Models.PlanesLog objlog = new Data.Models.PlanesLog();
                    objlog.Planeid = obj.Id;
                    objlog.Makeid = obj.Makeid;
                    objlog.Modelid = obj.Modelid;
                    objlog.Reference = obj.Reference;
                    objlog.Referenceprefix = obj.Referenceprefix;
                    objlog.Referencesuffix = obj.Referencesuffix;
                    objlog.Status = "A";
                    objlog.Action = "Deleted";
                    objlog.Createdby = obj.Createdby;
                    objlog.Createddate = obj.Createddate;
                    objlog.Modifiedby = obj.Modifiedby;
                    objlog.Modifieddate = obj.Modifieddate;
                    objlog.Deletedby = loggedinuser.id;
                    objlog.Deleteddate = currentdatetime;
                    var modifiedobjlog = db.PlanesLogs.Update(objlog);
                    db.SaveChanges();




                    apiresponse.code = 1;
                    apiresponse.message = "Plane deletion successful!";
                }
                else
                {
                    apiresponse.code = 99;
                    apiresponse.message = "Plane deletion unsuccessful!";
                }
                return apiresponse;
            }
        }

        public List<Data.Models.PlaneList> SearchPlanes(Data.RequestModels.Plane.SearchPlane request)
        {
            using (var db = new PSAContext(configuration))
            {
                List<Data.Models.PlaneList> planes = new List<Data.Models.PlaneList>();


                planes = db.SearchPlaneList(request).Result;
                return planes;
            }
        }
    }
}
