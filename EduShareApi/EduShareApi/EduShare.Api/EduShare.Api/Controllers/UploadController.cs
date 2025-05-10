using Amazon.S3;
using Amazon.S3.Model;
using EduShare.Core.Entities;
using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Mvc;
using static System.Net.Mime.MediaTypeNames;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EduShare.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IAmazonS3 _s3Client;

        public UploadController(IAmazonS3 s3Client)
        {
            _s3Client = s3Client;
        }

        [HttpGet("presigned-url")]
        public async Task<IActionResult> GetPresignedUrl([FromQuery] string fileName, [FromQuery] string fileType, [FromQuery] int folderId, [FromQuery] int userId)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = "edushare.testpnoren",
                Key = fileName,
                Verb = HttpVerb.PUT,
                Expires = DateTime.UtcNow.AddMinutes(15), // URL יהיה תקף ל-15 דקות
                ContentType = fileType // סוג הקובץ (כמו "application/pdf" או "audio/mpeg")
            };

            string url = _s3Client.GetPreSignedURL(request);
            return Ok(new { url });
        }
    }
}   
//using Amazon.S3;
//using Amazon.S3.Model;
//using EduShare.Core.IRepositories;
//using Microsoft.AspNetCore.Mvc;

//using Microsoft.AspNetCore.Mvc;
//using static System.Net.Mime.MediaTypeNames;
//// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

//namespace EduShare.Api.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class UploadController : ControllerBase
//    {
//        private readonly IS3Service _s3Service;
//        private readonly IFileService _fileService;
//        public UploadController(IS3Service s3Service, IFileService fileService)
//        {
//            _s3Service = s3Service;
//            _fileService = fileService;
//        }

//        [HttpGet("presigned-url")]
//        public async Task<IActionResult> GetPresignedUrlAsync([FromQuery] string userId, [FromQuery] string fileName, [FromQuery] string contentType)//, [FromQuery] int category, [FromQuery] int fileSize)
//        {

//            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(fileName))
//                return BadRequest("Missing userId or fileName");
//            var url = await _s3Service.GeneratePresignedUrlAsync(userId, fileName, contentType);
//            return Ok(new { url });
//        }


//        [HttpGet("download-url/{fileName}")]
//        public async Task<IActionResult> GetDownloadUrl([FromQuery] string userId, string fileName)
//        {
//            var url = await _s3Service.GetDownloadUrlAsync(userId, fileName);
//            return Ok(new { downloadUrl = url });
//        }
//    }
//}
