using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduShare.Core.IServices
{
    public interface IAIService
    {
        Task<int?> PredictTopicIdAsync(string text);
    }
}
