using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.RequestModels.PlaneSpotting
{
    public class CreatePlaneSpotting
    {
        public int planeid { get; set; }
        public String location { get; set; }
        public DateTime date { get; set; }
        public String image { get; set; }
    }
}
