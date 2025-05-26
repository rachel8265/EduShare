using EduShare.Core.DTOs;
using EduShare.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EduShare.Core.IRepositories
{
    public interface ITopicService
    {
        Task<IEnumerable<TopicDto>> GetAllTopicsAsync();
        Task<TopicDto> GetTopicByIdAsync(int id);
        Task<TopicDto> CreateTopicAsync(TopicDto topic);
        Task<bool> UpdateTopicAsync(int id, TopicDto topic);
        Task<bool> DeleteTopicAsync(int id);
    }
}
