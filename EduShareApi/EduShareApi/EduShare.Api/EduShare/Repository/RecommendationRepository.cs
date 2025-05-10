using EduShare.Core.IRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Recommendation = EduShare.Core.Entities.Recommendation;

namespace EduShare.Data.Repository
{
    public class RecommendationRepository : IRecommendationRepository
    {
        private readonly DataContext _dataContext;

        public RecommendationRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<IEnumerable<Recommendation>> GetAllAsync()
        {
            return await _dataContext.Recommendations.Include(r => r.File)
                                                       //.Include(r => r.User)
                                                       .ToListAsync();
        }

        public async Task<Recommendation> GetByIdAsync(int id)
        {
            return await _dataContext.Recommendations.FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<Recommendation> CreateAsync(Recommendation recommendation)
        {
            await _dataContext.Recommendations.AddAsync(recommendation);
            return recommendation;
        }

        public async Task<bool> UpdateAsync(int id, Recommendation recommendation)
        {
            var existRecommendation = await GetByIdAsync(id);
            if (existRecommendation == null)
                return false;

            existRecommendation.Comment = recommendation.Comment ?? existRecommendation.Comment;
            existRecommendation.UpdatedAt = DateTime.Now; // Update timestamp
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var recommendation = await GetByIdAsync(id);
            if (recommendation == null)
                return false;

            _dataContext.Recommendations.Remove(recommendation);
            return true;
        }
    }
}
