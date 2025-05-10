using EduShare.Core.DTOs;
using EduShare.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EduShare.Core.IRepositories
{
    public interface IRecommendationService
    {
        Task<IEnumerable<RecommendationDto>> GetAllRecommendationsAsync();
        Task<RecommendationDto> GetRecommendationByIdAsync(int id);
        Task<RecommendationDto> CreateRecommendationAsync(RecommendationDto recommendation);
        Task<bool> UpdateRecommendationAsync(int id, RecommendationDto recommendation);
        Task<bool> DeleteRecommendationAsync(int id);
    }
}
