using Data.Models;
using Microsoft.Extensions.Configuration;

namespace Business
{
    public class UsersBo
    {
        public IConfiguration configuration { get; }
        public UsersBo(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public Data.ResponseModels.LoginDetails LoginUser(Data.RequestModels.LoginDetails request)
        {
            try
            {
                String hashpassword = SHA512(request.password);
                using (var db = new PSAContext(configuration))
                {
                    Data.ResponseModels.LoginDetails logindetail = new Data.ResponseModels.LoginDetails();
                    Data.ResponseModels.APIReponseDetails apiresponse = new Data.ResponseModels.APIReponseDetails();
                    Data.ResponseModels.AccessTypes accesstype = new Data.ResponseModels.AccessTypes();
                    var validateobj = db.Users.Where(a => a.Email == request.email && a.Password == hashpassword && a.Status == "A").ToList();

                    if (validateobj.Count > 0)
                    {

                        var access = (from a in db.Users
                                      join b in db.UserTypes on a.Usertypeid equals b.Id
                                      where a.Email == request.email && b.Status == "A" && a.Status == "A"
                                      select b).ToList();

                        logindetail.id = validateobj.ElementAt(0).Id;
                        logindetail.name = validateobj.ElementAt(0).Name;
                        logindetail.email = request.email;
                        accesstype.accesstypeid = access.ElementAt(0).Id;
                        accesstype.accesstypename = access.ElementAt(0).Name;
                        logindetail.access = accesstype;
                        apiresponse.code = 1;
                        apiresponse.message = "User login successful!";
                        logindetail.apiresponse = apiresponse;
                    }
                    else
                    {
                        logindetail.email = request.email;
                        apiresponse.code = 99;
                        apiresponse.message = "Invalid user name or password!";
                        logindetail.apiresponse = apiresponse;
                    }
                    return logindetail;
                }
            }
            catch
            {
                Data.ResponseModels.LoginDetails logindetail = new Data.ResponseModels.LoginDetails();
                Data.ResponseModels.APIReponseDetails apiresponse = new Data.ResponseModels.APIReponseDetails();
                apiresponse.code = 99;
                apiresponse.message = "Login failed!";
                logindetail.apiresponse = apiresponse;
                return logindetail;
            }
        }

        public List<Data.Models.UserType> GetUserType()
        {
            using (var db = new PSAContext(configuration))
            {
                List<Data.Models.UserType> usertype = new List<Data.Models.UserType>();
                usertype = db.UserTypes.ToList();
                return usertype;
            }
        }


        public Data.ResponseModels.APIReponseDetails CreateUser(Data.RequestModels.User.CreateUser request, Data.ResponseModels.LoginDetails loggedinuser)
        {
            String hashpassword = SHA512(request.password);
            using (var db = new PSAContext(configuration))
            {
                Data.ResponseModels.APIReponseDetails apiresponse = new Data.ResponseModels.APIReponseDetails();

                var validateobj = db.Users.Where(a => a.Email == request.email && a.Status == "A").ToList();

                if (validateobj.Count == 0)
                {
                    Data.Models.User user = new Data.Models.User();
                    user.Usertypeid = request.usertypeid;
                    user.Name = request.name;
                    user.Email = request.email;
                    user.Password = hashpassword;
                    user.Status = "A";
                    user.Createdby = loggedinuser.id;
                    user.Createddate = DateTime.Now;
                    var createduser = db.Users.Add(user);
                    db.SaveChanges();


                    apiresponse.code = 1;
                    apiresponse.message = "User registration successful!";
                }
                else
                {
                    apiresponse.code = 99;
                    apiresponse.message = "User has been already registered!";
                }
                return apiresponse;
            }
        }

        public Data.ResponseModels.APIReponseDetails UpdateUsers(Data.RequestModels.User.UpdateUser request, Data.ResponseModels.LoginDetails loggedinuser)
        {
            using (var db = new PSAContext(configuration))
            {
                Data.ResponseModels.APIReponseDetails apiresponse = new Data.ResponseModels.APIReponseDetails();

                var validateobj = db.Users.Where(a => a.Id == request.userid && a.Status == "A").ToList();

                if (validateobj.Count > 0)
                {
                    Data.Models.User user = validateobj.ElementAt(0);
                    user.Usertypeid = request.usertypeid;
                    user.Name = request.name;
                    user.Status = "A";
                    user.Modifiedby = loggedinuser.id;
                    user.Modifieddate = DateTime.Now;
                    var modifieduser = db.Users.Update(user);
                    db.SaveChanges();


                    apiresponse.code = 1;
                    apiresponse.message = "User modification successful!";
                }
                else
                {
                    apiresponse.code = 99;
                    apiresponse.message = "User modification unsuccessful!";
                }
                return apiresponse;
            }
        }

        public Data.ResponseModels.APIReponseDetails DeleteUsers(Data.RequestModels.User.DeleteUser request, Data.ResponseModels.LoginDetails loggedinuser)
        {
            using (var db = new PSAContext(configuration))
            {
                Data.ResponseModels.APIReponseDetails apiresponse = new Data.ResponseModels.APIReponseDetails();

                var validateobj = db.Users.Where(a => a.Id == request.userid && a.Status == "A").ToList();

                if (validateobj.Count > 0)
                {
                    Data.Models.User user = validateobj.ElementAt(0);
                    user.Status = "D";
                    user.Deletedby = loggedinuser.id;
                    user.Deleteddate = DateTime.Now;
                    var modifieduser = db.Users.Update(user);
                    db.SaveChanges();


                    apiresponse.code = 1;
                    apiresponse.message = "User deletion successful!";
                }
                else
                {
                    apiresponse.code = 99;
                    apiresponse.message = "User deletion unsuccessful!";
                }
                return apiresponse;
            }
        }


        public List<Data.Models.UserList> SearchUsers(Data.RequestModels.User.SearchUser request)
        {
            using (var db = new PSAContext(configuration))
            {
                List<Data.Models.UserList> users = new List<Data.Models.UserList>();


                users = db.SearchUsersList(request).Result;
                return users;
            }
        }

        public static string SHA512(string input)
        {
            var bytes = System.Text.Encoding.UTF8.GetBytes(input);
            using (var hash = System.Security.Cryptography.SHA512.Create())
            {
                var hashedInputBytes = hash.ComputeHash(bytes);

                // Convert to text
                // StringBuilder Capacity is 128, because 512 bits / 8 bits in byte * 2 symbols for byte 
                var hashedInputStringBuilder = new System.Text.StringBuilder(128);
                foreach (var b in hashedInputBytes)
                    hashedInputStringBuilder.Append(b.ToString("X2"));
                return hashedInputStringBuilder.ToString();
            }
        }
    }
}