using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.RequestModels.PlaneSpotting
{
    public class SearchPlaneSpotting
    {
        public String searchtext { get; set; }
        public int? makeid { get; set; }
        public int? modelid { get; set; }
        public int? planeid { get; set; }
        public DateTime? fromdate { get; set; }
        public DateTime? todate { get; set; }
    }
}
