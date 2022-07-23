using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.ResponseModels
{
    public class APIReponseDetails
    {
        public int code { get; set; }
        public String message { get; set; }
        public String result { get; set; }
    }
}
