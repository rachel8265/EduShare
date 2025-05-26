using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduShare.Core.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string Password { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public DateTime LastLoginAt { get; set; } = DateTime.UtcNow;


        public List<Role> Roles { get; set; }
        public List<File> Files { get; set; }
        public List<Folder> Folders { get; set; }
        //public List<Rating> Ratings { get; set; }
        //public List<Recommendation> Recommendations { get; set; }
    }
}
