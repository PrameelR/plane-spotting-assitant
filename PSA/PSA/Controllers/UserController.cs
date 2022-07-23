using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace PSA.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly Business.UsersBo userservice;
        public UserController(Business.UsersBo userservice)
        {
            this.userservice = userservice;
        }
        [HttpPost]
        [Route("loginuser")]
        public Data.ResponseModels.LoginDetails LoginUser([FromBody] Data.RequestModels.LoginDetails request)
        {
            Data.ResponseModels.LoginDetails loggedinuser = userservice.LoginUser(request);
            if (loggedinuser.apiresponse.code == 1)
            {
                HttpContext.Session.SetString("LoginUser", JsonConvert.SerializeObject(loggedinuser));
            }
            return loggedinuser;
        }

        [HttpPost]
        [Route("logoutuser")]
        public Data.ResponseModels.LogoutDetails LogoutUser([FromBody] Data.RequestModels.LogoutDetails request)
        {
            HttpContext.Session.SetString("LoginUser", "");
            Data.ResponseModels.LogoutDetails logoutdetail = new Data.ResponseModels.LogoutDetails();
            Data.ResponseModels.APIReponseDetails apiresponse = new Data.ResponseModels.APIReponseDetails();
            logoutdetail.username = request.email;
            apiresponse.code = 1;
            apiresponse.message = "User successfully logged out!";
            logoutdetail.apiresponse = apiresponse;
            return logoutdetail;
        }


        [HttpGet]
        [Route("getloginuser")]
        public Data.ResponseModels.LoginDetails GetLoginUser()
        {
            var logiuser = HttpContext.Session.GetString("LoginUser");
            if (logiuser != null)
            {
                Data.ResponseModels.LoginDetails loggedinuser = JsonConvert.DeserializeObject<Data.ResponseModels.LoginDetails>(logiuser);
                return loggedinuser;
            }
            else
            {
                return null;
            }
        }

        [HttpPost]
        [Route("createuser")]
        public Data.ResponseModels.APIReponseDetails CreateUser([FromBody] Data.RequestModels.User.CreateUser request)
        {
            var logiuser = HttpContext.Session.GetString("LoginUser");
            if (logiuser != null)
            {
                Data.ResponseModels.LoginDetails loggedinuser = JsonConvert.DeserializeObject<Data.ResponseModels.LoginDetails>(logiuser);
                Data.ResponseModels.APIReponseDetails response = userservice.CreateUser(request, loggedinuser);
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
        [Route("updateuser")]
        public Data.ResponseModels.APIReponseDetails UpdateUsers([FromBody] Data.RequestModels.User.UpdateUser request)
        {
            var logiuser = HttpContext.Session.GetString("LoginUser");
            if (logiuser != null)
            {
                Data.ResponseModels.LoginDetails loggedinuser = JsonConvert.DeserializeObject<Data.ResponseModels.LoginDetails>(logiuser);
                Data.ResponseModels.APIReponseDetails response = userservice.UpdateUsers(request, loggedinuser);
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
        [Route("deleteuser")]
        public Data.ResponseModels.APIReponseDetails DeleteUser ([FromBody] Data.RequestModels.User.DeleteUser request)
        {
            var logiuser = HttpContext.Session.GetString("LoginUser");
            if (logiuser != null)
            {
                Data.ResponseModels.LoginDetails loggedinuser = JsonConvert.DeserializeObject<Data.ResponseModels.LoginDetails>(logiuser);
                Data.ResponseModels.APIReponseDetails response = userservice.DeleteUsers(request, loggedinuser);
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

        [HttpGet]
        [Route("getusertypes")]
        public List<Data.Models.UserType> GetUserType()
        {
            List<Data.Models.UserType> usertypes = userservice.GetUserType();
            return usertypes;
        }

        [HttpPost]
        [Route("getusers")]
        public List<Data.Models.UserList> SearchUsers(Data.RequestModels.User.SearchUser request)
        {
            List<Data.Models.UserList> users = userservice.SearchUsers(request);
            return users;
        }



    }
}
