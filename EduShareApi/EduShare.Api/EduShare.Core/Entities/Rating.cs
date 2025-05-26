using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduShare.Core.Entities
{
    public class Rating
    {
        public int Id { get; set; }
        public int RatingValue { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public string Comment { get; set; }
        [ForeignKey("File")]
        public int FileId { get; set; }
        public virtual File File { get; set; }
        //public int UserId { get; set; }
        //public virtual User User { get; set; }
    }

}
