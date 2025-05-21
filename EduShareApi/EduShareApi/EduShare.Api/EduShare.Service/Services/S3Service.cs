
using Amazon.S3;
using Amazon.S3.Model;
using Amazon.Util;
using EduShare.Core.IRepositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduShare.Service.Services
{

    public class S3Service : IS3Service
    {
        private readonly IAmazonS3 _s3Client;
        private readonly string _bucketName;

        public S3Service(IConfiguration configuration,IAmazonS3 amazonS3)
        {
            _s3Client = amazonS3;
            var awsOptions = configuration.GetSection("AWS");
            _bucketName = awsOptions["BucketName"]; // שמירת שם ה-Bucket
        }

        public Task<string> GeneratePresignedUrlAsync(string fileName, string fileType)
        {
            //string uniqueFileName = $"{Guid.NewGuid()}{Path.GetExtension(fileName)}";
            var request = new GetPreSignedUrlRequest
            {
                BucketName = "edushare.testpnoren",
                Key =  fileName ,
                Verb = HttpVerb.PUT,
                Expires = DateTime.UtcNow.AddMinutes(15),
                ContentType = fileType
            };

            string url = _s3Client.GetPreSignedURL(request);
            return Task.FromResult(url);
            //return url;
        }

        //public Task<string> GetDownloadUrlAsync(string fileName)
        //{
        //    var request = new GetPreSignedUrlRequest
        //    {
        //        BucketName = _bucketName,
        //        Key =  fileName , // מסלול הקובץ ב-Bucket
        //        Verb = HttpVerb.GET, // שינוי ל-GET להורדה
        //        Expires = DateTime.UtcNow.AddMinutes(30)// ה-URL יהיה תקף ל-30 דקות
        //         //ResponseHeaderOverrides = new ResponseHeaderOverrides
        //         //{
        //         //    ContentDisposition = $"attachment; filename=\"{fileName}\"" // הוספת כותרת הורדה
        //         //}
        //    };

        //    string url = _s3Client.GetPreSignedURL(request);
        //    return Task.FromResult(url);
        //}
        public Task<string> GetDownloadUrlAsync(string fileName)
        {
            // שם קובץ באנגלית לגיבוי
            var safeAsciiFileName = TransliterateToAscii(fileName) ?? "downloaded-file";
            var request = new GetPreSignedUrlRequest
            {
                BucketName = "edushare.testpnoren",
                Key = fileName,
                Verb = HttpVerb.GET,
                Expires = DateTime.UtcNow.AddMinutes(30),
                ResponseHeaderOverrides = new ResponseHeaderOverrides
                {
                    // קידוד שם בעברית לפי התקן
                    ContentDisposition = $"inline; filename=\"{safeAsciiFileName}\"; filename*=UTF-8''{Uri.EscapeDataString(fileName)}"
                }
            };

            string url = _s3Client.GetPreSignedURL(request);
            return Task.FromResult(url);
        }

        // פונקציה לעברית -> אנגלית פשוטה (מוסיפה תווים בלבד, אפשר לשפר עם transliteration רציני)
        private string TransliterateToAscii(string input)
        {
            var normalized = input.Normalize(NormalizationForm.FormKD);
            var bytes = Encoding.ASCII.GetBytes(normalized);
            return Encoding.ASCII.GetString(bytes).Replace("?", "");
        }


    }
}