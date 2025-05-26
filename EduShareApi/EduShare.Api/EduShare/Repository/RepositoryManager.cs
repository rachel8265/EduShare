using EduShare.Core.IRepositories;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace EduShare.Data.Repository
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly DataContext _context;
        public IFileRopository Files { get; }
        public IRatingRepository Ratings { get; }
        public IRecommendationRepository Recommendations { get; }
        public ITopicRepository Topics { get; }
        public IUserRepository Users { get; }
        public IFolderRepository Folders { get; }

        public RepositoryManager(DataContext context, IFileRopository files, IRatingRepository ratings, IRecommendationRepository recommendations, ITopicRepository topics, IUserRepository users,IFolderRepository folders)
        {
            _context = context;
            Files = files;
            Ratings = ratings;
            Recommendations = recommendations;
            Topics = topics;
            Users = users;
            Folders = folders;
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
