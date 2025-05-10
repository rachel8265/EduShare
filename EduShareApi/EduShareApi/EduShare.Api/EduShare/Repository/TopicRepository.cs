using EduShare.Core.IRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Topic = EduShare.Core.Entities.Topic;

namespace EduShare.Data.Repository
{
    public class TopicRepository : ITopicRepository
    {
        private readonly DataContext _dataContext;

        public TopicRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<IEnumerable<Topic>> GetAllAsync()
        {
            return await _dataContext.Topics.Include(t => t.Files).ToListAsync();
        }

        public async Task<Topic> GetByIdAsync(int id)
        {
            return await _dataContext.Topics.FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<Topic> CreateAsync(Topic topic)
        {
            await _dataContext.Topics.AddAsync(topic);
            return topic;
        }

        public async Task<bool> UpdateAsync(int id, Topic topic)
        {
            var existTopic = await GetByIdAsync(id);
            if (existTopic == null)
                return false;

            existTopic.Name = topic.Name ?? existTopic.Name;
            existTopic.Description = topic.Description ?? existTopic.Description;
            existTopic.UpdatedAt = DateTime.Now; // Update timestamp
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var topic = await GetByIdAsync(id);
            if (topic == null)
                return false;

            _dataContext.Topics.Remove(topic);
            return true;
        }
    }
}
