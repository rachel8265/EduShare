using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduShare.Core.Entities
{

    public class Folder
    {
        public int Id { get; set; } // מזהה ייחודי

        public string Name { get; set; } // שם התיקיה

        public int? ParentFolderId { get; set; } // תיקיית אב (null לתיקיית שורש)

        public int UserId { get; set; } // בעל התיקיה

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;// תאריך יצירה

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;// תאריך עדכון אחרון

        public bool IsDeleted { get; set; } // דגל למחיקה רכה
        public User User { get; set; }
        public List<File> Files { get; set; }
        public List<Folder> Folders { get; set; }

    }
}
