//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Text.RegularExpressions;
//using System.Threading.Tasks;
//using Tesseract;
//using DocumentFormat.OpenXml.Packaging;
//using PdfSharp.Pdf;
//using PdfSharp.Pdf.IO;
////using Microsoft.Office.Interop.PowerPoint;
//using Microsoft.Office.Interop.Word;
//using System.Drawing;
//using System.Text;
//using OpenAI;
//using System.Text.RegularExpressions;
//namespace EduShare.Service.Services
//{
//    public class AiFileClassifierService
//    {
//        private readonly string _tessdataPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "tessdata");
//        private readonly OpenAI_API _openAi;

//        public AiFileClassifierService(string openAiKey)
//        {
//            _openAi = new OpenAIAPI(openAiKey);
//        }

//        public async Task<string> ExtractTextAndClassifyAsync(string filePath)
//        {
//            string text = ExtractTextFromFile(filePath);
//            if (string.IsNullOrWhiteSpace(text))
//                return "לא זוהה תוכן לקריאה";

//            return await ClassifyTextWithAI(text);
//        }

//        private string ExtractTextFromFile(string filePath)
//        {
//            string ext = Path.GetExtension(filePath).ToLower();
//            switch (ext)
//            {
//                case ".jpg":
//                case ".jpeg":
//                case ".png":
//                case ".bmp":
//                    return ExtractTextFromImage(filePath);
//                case ".pdf":
//                    return ExtractTextFromPdf(filePath);
//                case ".docx":
//                    return ExtractTextFromWord(filePath);
//                case ".pptx":
//                    return ExtractTextFromPpt(filePath);
//                default:
//                    return "";
//            }
//        }

//        private string ExtractTextFromImage(string imagePath)
//        {
//            using var engine = new TesseractEngine(_tessdataPath, "heb+eng", EngineMode.Default);
//            using var img = Pix.LoadFromFile(imagePath);
//            using var page = engine.Process(img);
//            return page.GetText();
//        }

//        private string ExtractTextFromPdf(string pdfPath)
//        {
//            using var doc = PdfReader.Open(pdfPath, PdfDocumentOpenMode.ReadOnly);
//            var sb = new StringBuilder();
//            foreach (var page in doc.Pages)
//            {
//                var content = page.Contents;
//                sb.AppendLine(content.ToString());
//            }
//            return sb.ToString();
//        }

//        private string ExtractTextFromWord(string path)
//        {
//            using var wordDoc = WordprocessingDocument.Open(path, false);
//            return wordDoc.MainDocumentPart.Document.Body.InnerText;
//        }

//        private string ExtractTextFromPpt(string path)
//        {
//            var sb = new StringBuilder();
//            using var presentationDoc = PresentationDocument.Open(path, false);
//            var slides = presentationDoc.PresentationPart.SlideParts;

//            foreach (var slide in slides)
//            {
//                var texts = slide.Slide.Descendants<DocumentFormat.OpenXml.Drawing.Text>();
//                foreach (var t in texts)
//                    sb.AppendLine(t.Text);
//            }
//            return sb.ToString();
//        }

//        private async Task<string> ClassifyTextWithAI(string text)
//        {
//            var chat = _openAi.Chat.CreateConversation();
//            chat.AppendSystemMessage("סווג את הטקסט לפי נושא כללי ברור בקצרה. תן תשובה של מילה אחת או שתיים. תומך בעברית ואנגלית.");
//            chat.AppendUserInput(text.Length > 1000 ? text.Substring(0, 1000) : text);
//            var result = await chat.GetResponseFromChatbotAsync();
//            return Regex.Replace(result.Trim(), @"\r\n?|\n", "");
//        }
//    }
//}
