using EduShare.Core.DTOs;
using EduShare.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EduShare.Core.IRepositories
{
    public interface IRatingService
    {
        Task<IEnumerable<RatingDto>> GetAllRatingsAsync();
        Task<RatingDto> GetRatingByIdAsync(int id);
        Task<RatingDto> CreateRatingAsync(RatingDto rating);
        Task<bool> UpdateRatingAsync(int id, RatingDto rating);
        Task<bool> DeleteRatingAsync(int id);
    }
}
