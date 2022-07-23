using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.RequestModels.Plane
{
    public class SearchPlane
    {
        public String searchtext { get; set; }
        public int? makeid { get; set; }
        public int? modelid { get; set; }
    }
}
