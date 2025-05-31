using DocumentFormat.OpenXml.Packaging;
using EduShare.Core.IRepositories;
using EduShare.Core.IServices;

using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Tesseract;

namespace EduShare.Service.Services
{
    public class AIService : IAIService
    {
        private readonly HttpClient _httpClient;
        private readonly ITopicService _topicService;

        public AIService(HttpClient httpClient, ITopicService topicService)
        {
            _httpClient = httpClient;
            _topicService = topicService;
        }
        private async Task<Dictionary<string, int>> BuildTopicMapAsync()
        {
            var topicDtos = await _topicService.GetAllTopicsAsync();

            return topicDtos
                .GroupBy(t => t.Name.Trim(), StringComparer.OrdinalIgnoreCase)
                .ToDictionary(g => g.Key, g => g.First().Id, StringComparer.OrdinalIgnoreCase);
        }


        public async Task<int?> PredictTopicIdAsync(string text)
        {
            var systemPrompt = "You are a smart assistant. Given a text, return ONLY the exact name of its academic topic, e.g., Math, History, Bible, English, Physics, Chemistry. Return only the topic name without explanations.";

            var requestData = new
            {
                model = "gpt-3.5-turbo",
                temperature = 0,
                messages = new[]
                {
            new { role = "system", content = systemPrompt },
            new { role = "user", content = text }
        }
            };

            var requestJson = JsonSerializer.Serialize(requestData);
            var requestContent = new StringContent(requestJson, Encoding.UTF8, "application/json");

            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Environment.GetEnvironmentVariable("API_KEY"));
            var response = await _httpClient.PostAsync("https://api.openai.com/v1/chat/completions", requestContent);
            response.EnsureSuccessStatusCode();

            var responseJson = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(responseJson);

            var topicText = doc.RootElement
                .GetProperty("choices")[0]
                .GetProperty("message")
                .GetProperty("content")
                .GetString()
                ?.Trim();

            if (string.IsNullOrWhiteSpace(topicText))
                return null;

            var topicMap = await BuildTopicMapAsync();

            return topicMap.TryGetValue(topicText, out int topicId) ? topicId : null;
        }


    }

}
