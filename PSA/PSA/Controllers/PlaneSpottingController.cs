using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace PSA.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PlaneSpottingController : ControllerBase
    {

        private readonly Business.PlaneSpottingBo planespottingservice;
        public PlaneSpottingController(Business.PlaneSpottingBo planespottingservice)
        {
            this.planespottingservice = planespottingservice;
        }




        [HttpPost]
        [Route("createplanespotting")]
        public Data.ResponseModels.APIReponseDetails CreatePlaneSpotting([FromBody] Data.RequestModels.PlaneSpotting.CreatePlaneSpotting request)
        {
            var logiplane = HttpContext.Session.GetString("LoginUser");
            if (logiplane != null)
            {
                Data.ResponseModels.LoginDetails loginuser = JsonConvert.DeserializeObject<Data.ResponseModels.LoginDetails>(logiplane);
                Data.ResponseModels.APIReponseDetails response = planespottingservice.CreatePlaneSpotting(request, loginuser);
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
        [Route("updateplanespotting")]
        public Data.ResponseModels.APIReponseDetails UpdatePlaneSpotting([FromBody] Data.RequestModels.PlaneSpotting.UpdatePlaneSpotting request)
        {
            var logiplane = HttpContext.Session.GetString("LoginUser");
            if (logiplane != null)
            {
                Data.ResponseModels.LoginDetails loginuser = JsonConvert.DeserializeObject<Data.ResponseModels.LoginDetails>(logiplane);
                Data.ResponseModels.APIReponseDetails response = planespottingservice.UpdatePlaneSpotting(request, loginuser);
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
        [Route("deleteplanespotting")]
        public Data.ResponseModels.APIReponseDetails DeletePlaneSpotting([FromBody] Data.RequestModels.PlaneSpotting.DeletePlaneSpotting request)
        {
            var logiplane = HttpContext.Session.GetString("LoginUser");
            if (logiplane != null)
            {
                Data.ResponseModels.LoginDetails loginuser = JsonConvert.DeserializeObject<Data.ResponseModels.LoginDetails>(logiplane);
                Data.ResponseModels.APIReponseDetails response = planespottingservice.DeletePlaneSpotting(request, loginuser);
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
        [Route("getplanespottings")]
        public List<Data.Models.PlaneSpottingList> SearchPlaneSpotting(Data.RequestModels.PlaneSpotting.SearchPlaneSpotting request)
        {
            List<Data.Models.PlaneSpottingList> planespotting = planespottingservice.SearchPlaneSpottings(request);
            return planespotting;
        }

        [HttpPost]
        [Route("getrecentplanespottings")]
        public List<Data.Models.RecentPlaneSpottings> GetRecentPlaneSpottings(Data.RequestModels.PlaneSpotting.RecentPlaneSpotting request)
        {
            List<Data.Models.RecentPlaneSpottings> planespotting = planespottingservice.GetRecentPlaneSpottings(request);
            return planespotting;
        }


        [HttpPost]
        [Route("getplanespottingsliststat")]
        public List<Data.Models.PlaneSpottingStat> GetPlaneSpottingsListStat(Data.RequestModels.PlaneSpotting.StatPlaneSpotting request)
        {
            List<Data.Models.PlaneSpottingStat> planespotting = planespottingservice.GetPlaneSpottingsListStat(request);
            return planespotting;
        }

        [HttpPost]
        [Route("getplanespottingsliststatbymake")]
        public List<Data.Models.PlaneSpottingStat> GetPlaneSpottingsListStatByMake(Data.RequestModels.PlaneSpotting.StatPlaneSpotting request)
        {
            List<Data.Models.PlaneSpottingStat> planespotting = planespottingservice.GetPlaneSpottingsListStatByMake(request);
            return planespotting;
        }

        [HttpPost]
        [Route("getplanespottingsliststatbymodel")]
        public List<Data.Models.PlaneSpottingStat> GetPlaneSpottingsListStatByModel(Data.RequestModels.PlaneSpotting.StatPlaneSpotting request)
        {
            List<Data.Models.PlaneSpottingStat> planespotting = planespottingservice.GetPlaneSpottingsListStatByModel(request);
            return planespotting;
        }

        [HttpPost]
        [Route("getplanespottingsliststatbyplane")]
        public List<Data.Models.PlaneSpottingStat> GetPlaneSpottingsListStatByPlane(Data.RequestModels.PlaneSpotting.StatPlaneSpotting request)
        {
            List<Data.Models.PlaneSpottingStat> planespotting = planespottingservice.GetPlaneSpottingsListStatByPlane(request);
            return planespotting;
        }
    }
}

