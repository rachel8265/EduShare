namespace EduShare.Api.PostModels
{
    public class FilePostModel
    {
        public int UserId { get; set; }
        //public int TopicId { get; set; }רק כשר PUBLIC
        public string FileName { get; set; }
        public long FileSize { get; set; }
        public string FileType { get; set; }
        public int? FolderId { get; set; }
        public string? FileUrl { get; set; }



        //public bool IsPublic { get; set; }מעדכנים בהמשך

    }


}
