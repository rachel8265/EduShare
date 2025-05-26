using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduShare.Core.DTOs
{
    public class FileDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int? TopicId { get; set; }
        public int? FolderId { get; set; }

        public string FileName { get; set; }
        public string FileUrl { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public long FileSize { get; set; }
        public string FileType { get; set; }
        public bool IsPublic { get; set; }
    }

}
