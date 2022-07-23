using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.RequestModels.PlaneModel
{
    public class UpdatePlaneModel
    {
        public int modelid { get; set; }
        public int makeid { get; set; }
        public String name { get; set; }
    }
}
