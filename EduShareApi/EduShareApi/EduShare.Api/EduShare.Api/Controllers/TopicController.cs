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
    public class TopicController : ControllerBase
    {
        readonly ITopicService _topicService;
        readonly IMapper _mapper;

        public TopicController(ITopicService topicService, IMapper mapper)
        {
            _topicService = topicService;
            _mapper = mapper;
        }

        // GET: api/Topic
        [HttpGet]
        public async Task<ActionResult<List<TopicDto>>> Get()
        {
            var topics = await _topicService.GetAllTopicsAsync();
            return topics.ToList();
        }

        // GET api/Topic/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TopicDto>> GetById(int id)
        {
            if (id < 0) return BadRequest();
            TopicDto result = await _topicService.GetTopicByIdAsync(id);
            if (result == null)
                return NotFound();
            return result;
        }

        // POST api/Topic
        [HttpPost]
        public async Task<ActionResult<TopicDto>> Post([FromBody] TopicPostModel topic)
        {
            TopicDto TopicDto = _mapper.Map<TopicDto>(topic);
            TopicDto result = await _topicService.CreateTopicAsync(TopicDto);
            return result == null ? BadRequest(false) : result;
        }

        // PUT api/Topic/5
        [HttpPut("{id}")]
        public async Task<ActionResult<bool>> Put(int id, [FromBody] TopicPostModel topic)
        {
            TopicDto TopicDto = _mapper.Map<TopicDto>(topic);
            return await _topicService.UpdateTopicAsync(id, TopicDto) == false;
        }

        // DELETE api/Topic/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            return await _topicService.DeleteTopicAsync(id);
        }
    }
}