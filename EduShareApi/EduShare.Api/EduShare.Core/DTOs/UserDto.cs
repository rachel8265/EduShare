using EduShare.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduShare.Core.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public bool IsDeleted { get; set; } 
        public DateTime lastLoginAt { get; set; } = DateTime.UtcNow;
        public List<Role> Roles { get; set; } = new List<Role>();

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
