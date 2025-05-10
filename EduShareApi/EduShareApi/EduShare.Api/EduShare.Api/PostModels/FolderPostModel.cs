namespace EduShare.Api.PostModels
{
    public class FolderPostModel
    {
        public string Name { get; set; } // שם התיקיה
        public int? ParentFolderId { get; set; } // תיקיית אב (null לתיקיית שורש)
        public int UserId { get; set; } // בעל התיקיה
    }
}
