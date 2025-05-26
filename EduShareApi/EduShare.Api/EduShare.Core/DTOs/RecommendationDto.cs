using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduShare.Core.DTOs
{
    public class RecommendationDto
    {
        public int Id { get; set; }
        public int FileId { get; set; }
        //public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Comment { get; set; }
    }
}
