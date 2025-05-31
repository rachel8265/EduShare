//using OpenAI;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace EduShare.Service.Services
//{
//    public class FileClassificationService
//    {
//        private readonly IOpenAiClient _openAi;

//        public FileClassificationService(IOpenAiClient openAi)
//        {
//            _openAi = openAi;
//        }

//        public async Task<string> ClassifyTextAsync(string text)
//        {
//            string prompt = $"סווג את הטקסט הבא לפי נושא כללי ותגית תוכן:\n{text}";
//            var response = await _openAi.AskAsync(prompt);
//            return response;
//        }
//    }
//}
