using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.RequestModels.User
{
    public class SearchUser
    {
        public String searchtext { get; set; }
        public int? usertypeid { get; set; }
    }
}
