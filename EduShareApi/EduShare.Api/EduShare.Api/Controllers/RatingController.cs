
using AutoMapper;
using EduShare.Api.PostModels;
using EduShare.Core.DTOs;
using EduShare.Core.IRepositories;
using EduShare.Core.IServices;
using EduShare.Service.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EduShare.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingController : ControllerBase
    {
        readonly IRatingService _ratingService;
        readonly IMapper _mapper;

        public RatingController(IRatingService ratingService, IMapper mapper)
        {
            _ratingService = ratingService;
            _mapper = mapper;
        }

        // GET: api/Rating
        [HttpGet]
        public async Task<ActionResult<List<RatingDto>>> Get()
        {
            var ratings = await _ratingService.GetAllRatingsAsync();
            return ratings.ToList();
        }


        // GET api/Rating/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RatingDto>> GetById(int id)
        {
            if (id < 0) return BadRequest();
            RatingDto result = await _ratingService.GetRatingByIdAsync(id);
            if (result == null)
                return NotFound();
            return result;
        }

        // POST api/Rating
        [HttpPost]
        public async Task<ActionResult<RatingDto>> Post([FromBody] RatingPostModel rating)
        {
            RatingDto RatingDto = _mapper.Map<RatingDto>(rating);
            RatingDto result = await _ratingService.CreateRatingAsync(RatingDto);
            return result == null ? BadRequest(false) : result;
        }

        // PUT api/Rating/5
        [HttpPut("{id}")]
        public async Task<ActionResult<bool>> Put(int id, [FromBody] RatingPostModel rating)
        {
            RatingDto RatingDto = _mapper.Map<RatingDto>(rating);
            return await _ratingService.UpdateRatingAsync(id, RatingDto) == false;
        }

        // DELETE api/Rating/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            return await _ratingService.DeleteRatingAsync(id);
        }
    }
}