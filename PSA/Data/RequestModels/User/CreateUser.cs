﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.RequestModels.User
{
    public class CreateUser
    {
        public String name { get; set; }
        public String email { get; set; }
        public String password { get; set; }
        public int usertypeid { get; set; }
    }
}
