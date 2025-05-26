using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduShare.Core.Entities
{
    public class Recommendation
    {
        public int Id { get; set; }
        public int FileId { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public string Comment { get; set; }

        public virtual File File { get; set; }
        //public virtual User User { get; set; }
    }
}
