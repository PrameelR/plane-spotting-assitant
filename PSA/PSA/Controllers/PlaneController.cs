using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace PSA.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PlaneController : ControllerBase
    {
        private readonly Business.PlanesBo planeservice;
        public PlaneController(Business.PlanesBo planeservice)
        {
            this.planeservice = planeservice;
        }


        [HttpPost]
        [Route("createplanemake")]
        public Data.ResponseModels.APIReponseDetails CreatePlaneMake([FromBody] Data.RequestModels.PlaneMake.CreatePlaneMake request)
        {
            var logiplanemake = HttpContext.Session.GetString("LoginUser");
            if (logiplanemake != null)
            {
                Data.ResponseModels.LoginDetails loginuser = JsonConvert.DeserializeObject<Data.ResponseModels.LoginDetails>(logiplanemake);
                Data.ResponseModels.APIReponseDetails response = planeservice.CreatePlaneMake(request, loginuser);
                return response;
            }
            else
            {
                Data.ResponseModels.APIReponseDetails response = new Data.ResponseModels.APIReponseDetails();
                response.code = 99;
                response.message = "You don't have required permission";
                return response;
            }
        }

        [HttpPost]
        [Route("updateplanemake")]
        public Data.ResponseModels.APIReponseDetails UpdatePlaneMakes([FromBody] Data.RequestModels.PlaneMake.UpdatePlaneMake request)
        {
            var logiplanemake = HttpContext.Session.GetString("LoginUser");
            if (logiplanemake != null)
            {
                Data.ResponseModels.LoginDetails loginuser = JsonConvert.DeserializeObject<Data.ResponseModels.LoginDetails>(logiplanemake);
                Data.ResponseModels.APIReponseDetails response = planeservice.UpdatePlaneMakes(request,loginuser);
                return response;
            }
            else
            {
                Data.ResponseModels.APIReponseDetails response = new Data.ResponseModels.APIReponseDetails();
                response.code = 99;
                response.message = "You don't have required permission";
                return response;
            }
        }

        [HttpPost]
        [Route("deleteplanemake")]
        public Data.ResponseModels.APIReponseDetails DeletePlaneMake([FromBody] Data.RequestModels.PlaneMake.DeletePlaneMake request)
        {
            var logiplanemake = HttpContext.Session.GetString("LoginUser");
            if (logiplanemake != null)
            {
                Data.ResponseModels.LoginDetails loginuser = JsonConvert.DeserializeObject<Data.ResponseModels.LoginDetails>(logiplanemake);
                Data.ResponseModels.APIReponseDetails response = planeservice.DeletePlaneMakes(request, loginuser);
                return response;
            }
            else
            {
                Data.ResponseModels.APIReponseDetails response = new Data.ResponseModels.APIReponseDetails();
                response.code = 99;
                response.message = "You don't have required permission";
                return response;
            }
        }

        [HttpPost]
        [Route("getplanemakes")]
        public List<Data.Models.PlaneMakeList> SearchPlaneMakes(Data.RequestModels.PlaneMake.SearchPlaneMake request)
        {
            List<Data.Models.PlaneMakeList> planemakes = planeservice.SearchPlaneMakes(request);
            return planemakes;
        }


        [HttpPost]
        [Route("createplanemodel")]
        public Data.ResponseModels.APIReponseDetails CreatePlaneModel([FromBody] Data.RequestModels.PlaneModel.CreatePlaneModel request)
        {
            var logiplanemodel = HttpContext.Session.GetString("LoginUser");
            if (logiplanemodel != null)
            {
                Data.ResponseModels.LoginDetails loginuser = JsonConvert.DeserializeObject<Data.ResponseModels.LoginDetails>(logiplanemodel);
                Data.ResponseModels.APIReponseDetails response = planeservice.CreatePlaneModel(request, loginuser);
                return response;
            }
            else
            {
                Data.ResponseModels.APIReponseDetails response = new Data.ResponseModels.APIReponseDetails();
                response.code = 99;
                response.message = "You don't have required permission";
                return response;
            }
        }

        [HttpPost]
        [Route("updateplanemodel")]
        public Data.ResponseModels.APIReponseDetails UpdatePlaneModels([FromBody] Data.RequestModels.PlaneModel.UpdatePlaneModel request)
        {
            var logiplanemodel = HttpContext.Session.GetString("LoginUser");
            if (logiplanemodel != null)
            {
                Data.ResponseModels.LoginDetails loginuser = JsonConvert.DeserializeObject<Data.ResponseModels.LoginDetails>(logiplanemodel);
                Data.ResponseModels.APIReponseDetails response = planeservice.UpdatePlaneModels(request, loginuser);
                return response;
            }
            else
            {
                Data.ResponseModels.APIReponseDetails response = new Data.ResponseModels.APIReponseDetails();
                response.code = 99;
                response.message = "You don't have required permission";
                return response;
            }
        }

        [HttpPost]
        [Route("deleteplanemodel")]
        public Data.ResponseModels.APIReponseDetails DeletePlaneModel([FromBody] Data.RequestModels.PlaneModel.DeletePlaneModel request)
        {
            var logiplanemodel = HttpContext.Session.GetString("LoginUser");
            if (logiplanemodel != null)
            {
                Data.ResponseModels.LoginDetails loginuser = JsonConvert.DeserializeObject<Data.ResponseModels.LoginDetails>(logiplanemodel);
                Data.ResponseModels.APIReponseDetails response = planeservice.DeletePlaneModels(request, loginuser);
                return response;
            }
            else
            {
                Data.ResponseModels.APIReponseDetails response = new Data.ResponseModels.APIReponseDetails();
                response.code = 99;
                response.message = "You don't have required permission";
                return response;
            }
        }

        [HttpPost]
        [Route("getplanemodels")]
        public List<Data.Models.PlaneModelList> SearchPlaneModels(Data.RequestModels.PlaneModel.SearchPlaneModel request)
        {
            List<Data.Models.PlaneModelList> planemodels = planeservice.SearchPlaneModels(request);
            return planemodels;
        }


        [HttpPost]
        [Route("createplane")]
        public Data.ResponseModels.APIReponseDetails CreatePlane([FromBody] Data.RequestModels.Plane.CreatePlane request)
        {
            var logiplane = HttpContext.Session.GetString("LoginUser");
            if (logiplane != null)
            {
                Data.ResponseModels.LoginDetails loginuser = JsonConvert.DeserializeObject<Data.ResponseModels.LoginDetails>(logiplane);
                Data.ResponseModels.APIReponseDetails response = planeservice.CreatePlane(request, loginuser);
                return response;
            }
            else
            {
                Data.ResponseModels.APIReponseDetails response = new Data.ResponseModels.APIReponseDetails();
                response.code = 99;
                response.message = "You don't have required permission";
                return response;
            }
        }

        [HttpPost]
        [Route("updateplane")]
        public Data.ResponseModels.APIReponseDetails UpdatePlanes([FromBody] Data.RequestModels.Plane.UpdatePlane request)
        {
            var logiplane = HttpContext.Session.GetString("LoginUser");
            if (logiplane != null)
            {
                Data.ResponseModels.LoginDetails loginuser = JsonConvert.DeserializeObject<Data.ResponseModels.LoginDetails>(logiplane);
                Data.ResponseModels.APIReponseDetails response = planeservice.UpdatePlanes(request, loginuser);
                return response;
            }
            else
            {
                Data.ResponseModels.APIReponseDetails response = new Data.ResponseModels.APIReponseDetails();
                response.code = 99;
                response.message = "You don't have required permission";
                return response;
            }
        }

        [HttpPost]
        [Route("deleteplane")]
        public Data.ResponseModels.APIReponseDetails DeletePlane([FromBody] Data.RequestModels.Plane.DeletePlane request)
        {
            var logiplane = HttpContext.Session.GetString("LoginUser");
            if (logiplane != null)
            {
                Data.ResponseModels.LoginDetails loginuser = JsonConvert.DeserializeObject<Data.ResponseModels.LoginDetails>(logiplane);
                Data.ResponseModels.APIReponseDetails response = planeservice.DeletePlanes(request, loginuser);
                return response;
            }
            else
            {
                Data.ResponseModels.APIReponseDetails response = new Data.ResponseModels.APIReponseDetails();
                response.code = 99;
                response.message = "You don't have required permission";
                return response;
            }
        }

        [HttpPost]
        [Route("getplanes")]
        public List<Data.Models.PlaneList> SearchPlanes(Data.RequestModels.Plane.SearchPlane request)
        {
            List<Data.Models.PlaneList> planes = planeservice.SearchPlanes(request);
            return planes;
        }
    }
}
