using AutoMapper;
using EduShare.Core.DTOs;
using EduShare.Core.Entities;
using EduShare.Core.IRepositories;
using EduShare.Core.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EduShare.Service.Services
{
    public class RatingService : IRatingService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public RatingService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<IEnumerable<RatingDto>> GetAllRatingsAsync()
        {
            var ratings = await _repositoryManager.Ratings.GetAllAsync();
            return _mapper.Map<IEnumerable<RatingDto>>(ratings);
        }

        public async Task<RatingDto?> GetRatingByIdAsync(int id)
        {
            var rating = await _repositoryManager.Ratings.GetByIdAsync(id);
            return _mapper.Map<RatingDto>(rating);
        }

        public async Task<RatingDto> CreateRatingAsync(RatingDto ratingObj)
        {
            var existingRating = await _repositoryManager.Ratings.GetByIdAsync((int)ratingObj.Id);
            if (existingRating == null)
            {
                var ratingEntity = _mapper.Map<Rating>(ratingObj);
                await _repositoryManager.Ratings.CreateAsync(ratingEntity);
                await _repositoryManager.SaveAsync();
                return _mapper.Map<RatingDto>(ratingEntity);
            }
            return null;
        }

        public async Task<bool> UpdateRatingAsync(int id, RatingDto ratingObj)
        {
            var existingRating = await _repositoryManager.Ratings.GetByIdAsync((int)id);
            if (existingRating != null)
            {
                var ratingEntity = _mapper.Map<Rating>(ratingObj);
                await _repositoryManager.Ratings.UpdateAsync(id, ratingEntity);
                await _repositoryManager.SaveAsync();
                return true;
            }
            return false;
        }

        public async Task<bool> DeleteRatingAsync(int id)
        {
            var rating = await _repositoryManager.Ratings.GetByIdAsync((int)id);
            if (rating != null)
            {
                await _repositoryManager.Ratings.DeleteAsync((int)id);
                await _repositoryManager.SaveAsync();
                return true;
            }
            return false;
        }
    }
}
