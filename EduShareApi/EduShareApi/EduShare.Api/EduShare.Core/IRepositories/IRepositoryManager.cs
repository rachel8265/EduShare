using EduShare.Core.Entities;
using EduShare.Core.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using File = EduShare.Core.Entities.File;

namespace EduShare.Core.IRepositories
{
    public interface IRepositoryManager
    {
        IFileRopository Files { get; }
       IRatingRepository Ratings { get; }
       IRecommendationRepository Recommendations { get; }
        ITopicRepository Topics { get; }
        IUserRepository Users { get; }
        IFolderRepository Folders { get; }
        Task SaveAsync();
    }
}
