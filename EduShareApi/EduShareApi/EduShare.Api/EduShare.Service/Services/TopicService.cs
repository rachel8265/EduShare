using AutoMapper;
using EduShare.Core.DTOs;
using EduShare.Core.Entities;
using EduShare.Core.IRepositories;
using EduShare.Core.IServices;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EduShare.Service.Services
{
    public class TopicService : ITopicService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public TopicService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TopicDto>> GetAllTopicsAsync()
        {
            var topics = await _repositoryManager.Topics.GetAllAsync();
            return _mapper.Map<IEnumerable<TopicDto>>(topics);
        }

        public async Task<TopicDto?> GetTopicByIdAsync(int id)
        {
            var topic = await _repositoryManager.Topics.GetByIdAsync(id);
            return _mapper.Map<TopicDto>(topic);
        }

        public async Task<TopicDto> CreateTopicAsync(TopicDto topicObj)
        {
            var existingTopic = await _repositoryManager.Topics.GetByIdAsync((int)topicObj.Id);
            if (existingTopic == null)
            {
                var topicEntity = _mapper.Map<Topic>(topicObj);
                await _repositoryManager.Topics.CreateAsync(topicEntity);
                await _repositoryManager.SaveAsync();
                return _mapper.Map<TopicDto>(topicEntity);
            }
            return null;
        }

        //public async Task<bool> UpdateTopicAsync(int id, TopicDto topicObj)
        //{
        //    var existingTopic = await _repositoryManager.Topics.GetByIdAsync((int)id);
        //    if (existingTopic != null)
        //    {
        //        var topicEntity = _mapper.Map<Topic>(topicObj);
        //        await _repositoryManager.Topics.UpdateAsync( topicEntity);
        //        await _repositoryManager.SaveAsync();
        //        return true;
        //    }
        //    return false;
        //}


        public async Task<bool> UpdateTopicAsync(int id, TopicDto topicDto)
        {
            var existingTopic = await _repositoryManager.Topics.GetByIdAsync(id);
            if (existingTopic == null)
                return false;

            existingTopic.Name = topicDto.Name ?? existingTopic.Name;
            existingTopic.Description = topicDto.Description ?? existingTopic.Description;
            existingTopic.UpdatedAt = DateTime.UtcNow;

            await _repositoryManager.Topics.UpdateAsync(existingTopic);
            await _repositoryManager.SaveAsync();
            return true;
        }

        public async Task<bool> DeleteTopicAsync(int id)
        {
            var topic = await _repositoryManager.Topics.GetByIdAsync((int)id);
            if (topic != null)
            {
                await _repositoryManager.Topics.DeleteAsync((int)id);
                await _repositoryManager.SaveAsync();
                return true;
            }
            return false;
        }
    }
}
