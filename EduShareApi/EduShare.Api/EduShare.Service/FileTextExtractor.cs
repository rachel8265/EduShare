using DocumentFormat.OpenXml.Packaging;
using PdfSharp.Pdf.IO;
using System;
using System.Collections.Generic;
using System.Drawing.Imaging;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Tesseract;
using UglyToad.PdfPig;
using File = EduShare.Core.Entities.File;
using Docnet.Core;
using Docnet.Core.Models;
//using ImgFmt = System.Drawing.Imaging.ImageFormat;
using A = DocumentFormat.OpenXml.Drawing;

namespace EduShare.Service
{
    public class FileTextExtractor
    {
        public static string ExtractText(string fileName, byte[] content)
        {
            var ext = Path.GetExtension(fileName).ToLower();
            return ext switch
            {
                ".pdf" => TryExtractTextFromPdf(content),
                ".docx" => ExtractTextFromWord(content),
                ".pptx" => ExtractTextFromPowerPoint(content),
                ".jpg" or ".jpeg" or ".png" => ExtractTextFromImage(content),
                _ => ""
            };
        }

        private static string TryExtractTextFromPdf(byte[] content)
        {
            var text = ExtractTextFromPdf(content); // עם PdfPig
            if (string.IsNullOrWhiteSpace(text) || text.Length < 30) // נניח שאין טקסט אמיתי
                text = ExtractTextFromScannedPdf(content); // עם OCR
            return text;
        }

        public static string ExtractTextFromPdf(byte[] content)
        {
            using var ms = new MemoryStream(content);
            using var pdf = PdfDocument.Open(ms);
            var sb = new StringBuilder();
            foreach (var page in pdf.GetPages())
            {
                sb.AppendLine(page.Text);
            }
            return sb.ToString();
        }

        private static string ExtractTextFromWord(byte[] content)
        {
            using var stream = new MemoryStream(content);
            using var doc = WordprocessingDocument.Open(stream, false);
            return doc.MainDocumentPart.Document.Body.InnerText;
        }

        private static string ExtractTextFromPowerPoint(byte[] content)
        {
            using var stream = new MemoryStream(content);
            using var ppt = PresentationDocument.Open(stream, false);
            var slides = ppt.PresentationPart.SlideParts;
            var text = new StringBuilder();

            foreach (var slide in slides)
            {
                foreach (var para in slide.Slide.Descendants<A.Paragraph>())
                {
                    text.AppendLine(para.InnerText);
                }
            }

            return text.ToString();
        }

        private static string ExtractTextFromImage(byte[] content)
        {
            var tessDataPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "tessdata");
            //using var engine = new TesseractEngine(@"./tessdata", "heb+eng", EngineMode.Default);
            using var engine = new TesseractEngine(tessDataPath, "heb+eng", EngineMode.Default);
            using var img = Pix.LoadFromMemory(content);
            using var page = engine.Process(img);
            return page.GetText();
        }

        public static string ExtractTextFromScannedPdf(byte[] content)
        {
            var sb = new StringBuilder();

            using (var docReader = DocLib.Instance.GetDocReader(content, new PageDimensions(1080, 1920)))
            {
                int pageCount = docReader.GetPageCount();
                using (var engine = new TesseractEngine(@"./tessdata", "heb+eng", EngineMode.Default))
                {
                    for (int i = 0; i < pageCount; i++)
                    {
                        using (var pageReader = docReader.GetPageReader(i))
                        {
                            // הפוך עמוד לתמונה
                            var rawBytes = pageReader.GetImage();
                            using (var bmp = new Bitmap(pageReader.GetPageWidth(), pageReader.GetPageHeight(), PixelFormat.Format32bppArgb))
                            {
                                var bmpData = bmp.LockBits(new Rectangle(0, 0, bmp.Width, bmp.Height), ImageLockMode.WriteOnly, bmp.PixelFormat);
                                System.Runtime.InteropServices.Marshal.Copy(rawBytes, 0, bmpData.Scan0, rawBytes.Length);
                                bmp.UnlockBits(bmpData);

                                // המר לתמונה בפורמט שטסראקט יודע לקרוא
                                using (var ms = new MemoryStream())
                                {
                                    bmp.Save(ms, System.Drawing.Imaging.ImageFormat.Png);
                                    ms.Position = 0;
                                    using (var img = Pix.LoadFromMemory(ms.ToArray()))
                                    using (var page = engine.Process(img))
                                    {
                                        sb.AppendLine(page.GetText());
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return sb.ToString();
        }
    }
}
