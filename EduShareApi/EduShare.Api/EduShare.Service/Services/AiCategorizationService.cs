//using OpenAI;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using Tesseract;
//using UglyToad.PdfPig;


//namespace EduShare.Service.Services
//{
//    public class AiCategorizationService
//    {
//        private readonly OpenAIClient _client;
//        private readonly string _tessDataPath;
//        private readonly string _language;

//        public AiCategorizationService(OpenAIClient client, string tessDataPath = "tessdata", string language = "heb")
//        {
//            _tessDataPath = tessDataPath;
//            _language = language;
//            _client = client;
//        }


//        public async Task<string> ExtractTextFromFileAsync(string fileUrl)
//        {
//            try
//            {
//                using var httpClient = new HttpClient();
//                var fileBytes = await httpClient.GetByteArrayAsync(fileUrl);
//                var fileExtension = Path.GetExtension(fileUrl).ToLower();

//                return fileExtension switch
//                {
//                    ".jpg" or ".jpeg" or ".png" or ".bmp" or ".gif" or ".webp" => ExtractTextFromImage(fileBytes),
//                    ".pdf" => ExtractTextFromPdf(fileBytes),
//                    ".docx" => ExtractTextFromWord(fileBytes),
//                    ".pptx" => ExtractTextFromPptx(fileBytes),
//                    _ => "Unsupported file type"
//                };
//            }
//            catch (Exception ex)
//            {
//                return $"Error: {ex.Message}";
//            }
//        }

//        private string ExtractTextFromImage(byte[] imageBytes)
//        {
//            using var engine = new TesseractEngine(@"./tessdata", "eng", EngineMode.Default);
//            using var img = Pix.LoadFromMemory(imageBytes);
//            using var page = engine.Process(img);
//            var text = page.GetText();
//            return string.IsNullOrWhiteSpace(text) ? "No text detected" : text.Trim();
//        }

//        private string ExtractTextFromPdf(byte[] pdfBytes)
//        {
//            using var stream = new MemoryStream(pdfBytes);
//            using var document = PdfReader.Open(stream, PdfDocumentOpenMode.ReadOnly);

//            var text = new StringBuilder();
//            foreach (var page in document.Pages)
//            {
//                var content = page.Contents.CreateSingleContent().Stream.ToString(); // לא תמיד עובד
//                text.AppendLine(content);
//            }

//            return string.IsNullOrWhiteSpace(text.ToString()) ? "No text detected" : text.ToString();
//        }

//        private string ExtractTextFromWord(byte[] docxBytes)
//        {
//            using var ms = new MemoryStream(docxBytes);
//            using var doc = DocX.Load(ms);
//            var text = doc.Text;
//            return string.IsNullOrWhiteSpace(text) ? "No text detected" : text;
//        }

//        private string ExtractTextFromPptx(byte[] pptxBytes)
//        {
//            using var ms = new MemoryStream(pptxBytes);
//            using var ppt = PresentationDocument.Open(ms, false);

//            var sb = new StringBuilder();
//            var slideParts = ppt.PresentationPart?.SlideParts;

//            if (slideParts != null)
//            {
//                foreach (var slide in slideParts)
//                {
//                    var texts = slide.Slide.Descendants<DocumentFormat.OpenXml.Drawing.Text>();
//                    foreach (var t in texts)
//                    {
//                        sb.AppendLine(t.Text);
//                    }
//                }
//            }

//            return string.IsNullOrWhiteSpace(sb.ToString()) ? "No text detected" : sb.ToString();
//        }
//    }
//}

