using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations; // נדרש עבור MaxLength

namespace EduShare.Core.Entities
{
    public class Topic
    {
        public int Id { get; set; } // מזהה ייחודי של הנושא

        [Required] // מאפיין זה מחייב שהשדה לא יהיה ריק
        [MaxLength(100)] // מגביל את אורך המחרוזת ל-100 תווים
        public string? Name { get; set; } // שם הנושא

        [MaxLength(500)] // מגביל את אורך המחרוזת ל-500 תווים
        public string? Description { get; set; } // תיאור הנושא

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // תאריך יצירה של הנושא
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow; // תאריך עדכון של הנושא

        public List<File>? Files { get; set; } // רשימה של קבצים הקשורים לנושא
    }
}
