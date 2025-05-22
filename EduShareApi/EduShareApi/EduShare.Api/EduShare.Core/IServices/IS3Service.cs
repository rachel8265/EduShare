using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduShare.Core.IRepositories
{
    public interface IS3Service
    {
        Task<string> GeneratePresignedUrlAsync(string fileName, string fileType);
        Task<string> GetDownloadUrlAsync(string fileName);
        //Task<string> GetDownloadUrlAsync(string s3Key, string displayName);


    }
}