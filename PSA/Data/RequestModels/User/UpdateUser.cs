using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.RequestModels.User
{
    public class UpdateUser
    {
        public int userid { get; set; }
        public String name { get; set; }
        public int usertypeid { get; set; }
    }
}
