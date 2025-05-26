using AutoMapper;
using EduShare.Core.DTOs;
using EduShare.Core.Entities;
using EduShare.Core.IRepositories;
using EduShare.Core.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EduShare.Service.Services
{
    public class RecommendationService : IRecommendationService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public RecommendationService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<IEnumerable<RecommendationDto>> GetAllRecommendationsAsync()
        {
            var recommendations = await _repositoryManager.Recommendations.GetAllAsync();
            return _mapper.Map<IEnumerable<RecommendationDto>>(recommendations);
        }

        public async Task<RecommendationDto?> GetRecommendationByIdAsync(int id)
        {
            var recommendation = await _repositoryManager.Recommendations.GetByIdAsync(id);
            return _mapper.Map<RecommendationDto>(recommendation);
        }

        public async Task<RecommendationDto> CreateRecommendationAsync(RecommendationDto recommendationObj)
        {
            var existingRecommendation = await _repositoryManager.Recommendations.GetByIdAsync((int)recommendationObj.Id);
            if (existingRecommendation == null)
            {
                var recommendationEntity = _mapper.Map<Recommendation>(recommendationObj);
                await _repositoryManager.Recommendations.CreateAsync(recommendationEntity);
                await _repositoryManager.SaveAsync();
                return _mapper.Map<RecommendationDto>(recommendationEntity);
            }
            return null;
        }

        //public async Task<bool> UpdateRecommendationAsync(int id, RecommendationDto recommendationObj)
        //{
        //    var existingRecommendation = await _repositoryManager.Recommendations.GetByIdAsync((int)id);
        //    if (existingRecommendation != null)
        //    {
        //        var recommendationEntity = _mapper.Map<Recommendation>(recommendationObj);
        //        await _repositoryManager.Recommendations.UpdateAsync( recommendationEntity);
        //        await _repositoryManager.SaveAsync();
        //        return true;
        //    }
        //    return false;
        //}


        public async Task<bool> UpdateRecommendationAsync(int id, RecommendationDto recommendationDto)
        {
            var existingRecommendation = await _repositoryManager.Recommendations.GetByIdAsync(id);
            if (existingRecommendation == null)
                return false;

            existingRecommendation.Comment = recommendationDto.Comment ?? existingRecommendation.Comment;
            existingRecommendation.UpdatedAt = DateTime.UtcNow;

            await _repositoryManager.Recommendations.UpdateAsync(existingRecommendation);
            await _repositoryManager.SaveAsync();
            return true;
        }

        public async Task<bool> DeleteRecommendationAsync(int id)
        {
            var recommendation = await _repositoryManager.Recommendations.GetByIdAsync((int)id);
            if (recommendation != null)
            {
                await _repositoryManager.Recommendations.DeleteAsync((int)id);
                await _repositoryManager.SaveAsync();
                return true;
            }
            return false;
        }
    }
}
