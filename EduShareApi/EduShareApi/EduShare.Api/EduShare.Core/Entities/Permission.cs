﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduShare.Core.Entities
{
    public class Permission
    {
        public int Id { get; set; }
        public string PermissionName { get; set; }
        public string Description { get; set; }

        public List<Role> RolePermissions { get; set; }
    }
}
