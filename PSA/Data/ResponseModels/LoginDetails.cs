using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.ResponseModels
{
    public class LoginDetails
    {
        public int id { get; set; }
        public String name { get; set; }
        public String email { get; set; }
        public AccessTypes access { get; set; }
        public APIReponseDetails apiresponse { get; set; }
    }
}
