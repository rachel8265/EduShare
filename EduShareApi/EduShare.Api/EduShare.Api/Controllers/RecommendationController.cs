
using AutoMapper;
using EduShare.Api.PostModels;
using EduShare.Core.DTOs;
using EduShare.Core.IRepositories;
using EduShare.Core.IServices;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EduShare.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecommendationController : ControllerBase
    {
        readonly IRecommendationService _recommendationService;
        readonly IMapper _mapper;

        public RecommendationController(IRecommendationService recommendationService, IMapper mapper)
        {
            _recommendationService = recommendationService;
            _mapper = mapper;
        }

        // GET: api/Recommendation
        [HttpGet]
        public async Task<ActionResult<List<RecommendationDto>>> Get()
        {
            var recommendations = await _recommendationService.GetAllRecommendationsAsync();
            return recommendations.ToList();
        }


        // GET api/Recommendation/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RecommendationDto>> GetById(int id)
        {
            if (id < 0) return BadRequest();
            RecommendationDto result = await _recommendationService.GetRecommendationByIdAsync(id);
            if (result == null)
                return NotFound();
            return result;
        }

        // POST api/Recommendation
        [HttpPost]
        public async Task<ActionResult<RecommendationDto>> Post([FromBody] RecommendationPostModel recommendation)
        {
            RecommendationDto RecommendationDto = _mapper.Map<RecommendationDto>(recommendation);
            RecommendationDto result = await _recommendationService.CreateRecommendationAsync(RecommendationDto);
            return result == null ? BadRequest(false) : result;
        }

        // PUT api/Recommendation/5
        [HttpPut("{id}")]
        public async Task<ActionResult<bool>> Put(int id, [FromBody] RecommendationPostModel recommendation)
        {
            RecommendationDto RecommendationDto = _mapper.Map<RecommendationDto>(recommendation);
            return await _recommendationService.UpdateRecommendationAsync(id, RecommendationDto) == false;
        }

        // DELETE api/Recommendation/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            return await _recommendationService.DeleteRecommendationAsync(id);
        }
    }
}