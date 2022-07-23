using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.RequestModels.Plane
{
    public class UpdatePlane
    {
        public int planeid { get; set; }
        public int modelid { get; set; }
        public int makeid { get; set; }
        public String referenceprefix { get; set; }
        public String referencesuffix { get; set; }
        public String image { get; set; }
    }
}
