//using Amazon.S3.Model;
//using Amazon.S3;
//using EduShare.Core.IServices;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace EduShare.Service.Services
//{
//    public class UploadService : IUploadService
//    {
//        private readonly IAmazonS3 _s3Client;

//        public UploadService(IAmazonS3 s3Client)
//        {
//            _s3Client = s3Client;
//        }

//        public Task<string> GeneratePresignedUrlAsync(string fileName, string fileType)
//        {
//            var request = new GetPreSignedUrlRequest
//            {
//                BucketName = "edushare.testpnoren",
//                Key = fileName,
//                Verb = HttpVerb.PUT,
//                Expires = DateTime.UtcNow.AddMinutes(15),
//                ContentType = fileType
//            };

//            string url = _s3Client.GetPreSignedURL(request);
//            return Task.FromResult(url);
//        }


//    }

//}
