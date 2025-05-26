using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduShare.Core.Entities
{
    public class File
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int? TopicId { get; set; }
        public int? FolderId { get; set; }
        public bool IsDeleted { get; set; } = false;

        public string FileName { get; set; }
        public string FileUrl { get; set; }
        public long FileSize { get; set; } 
        public string FileType { get; set; } 
        public bool IsPublic { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public Folder? Folder { get; set; }
        public  User User { get; set; }
        public  Topic? Topic { get; set; }
        public  List<Rating> Ratings { get; set; }// = new List<Rating>();
        public  List<Recommendation> Recommendations { get; set; } //= new List<Recommendation>();
    }
}
