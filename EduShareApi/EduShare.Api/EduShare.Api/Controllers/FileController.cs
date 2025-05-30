﻿using AutoMapper;
using EduShare.Api.PostModels;
using EduShare.Api.UpdateModal;
using EduShare.Core.DTOs;
using EduShare.Core.IRepositories;
using EduShare.Core.IServices;
using EduShare.Data.Repository;
using EduShare.Service.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EduShare.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        readonly IFileService _fileService;
        readonly IMapper _mapper;
        readonly IS3Service _s3Service;
        private readonly IAIService _aiService;

        public FileController(IFileService fileService, IMapper mapper, IS3Service s3Service, IAIService aiService)
        {
            _fileService = fileService;
            _mapper = mapper;
            _s3Service = s3Service;
            _aiService = aiService;
         
        }

        // GET: api/File
        [HttpGet]
        public async Task<ActionResult<List<FileDto>>> Get()
        {
            var files = await _fileService.GetAllFilesAsync();
            return files.ToList();
        }

        // GET api/File/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FileDto>> GetById(int id)
        {
            if (id < 0) return BadRequest();
            FileDto result = await _fileService.GetFileByIdAsync(id);
            if (result == null)
                return NotFound();
            return result;
        }

        // POST api/File
        [HttpPost]
        public async Task<ActionResult<FileDto>> Post([FromBody] FilePostModel file)
        {
            FileDto FileDto = _mapper.Map<FileDto>(file);
            FileDto result = await _fileService.CreateFileAsync(FileDto);
            return result == null ? BadRequest(false) : result;
        }

        // PUT api/File/5
        //[HttpPut("{id}")]
        //public async Task<ActionResult<bool>> Put(int id, [FromBody] FilePostModel file)
        //{
        //    FileDto FileDto = _mapper.Map<FileDto>(file);
        //    return await _fileService.UpdateFileAsync(id, FileDto) == false;
        //}


        [HttpPatch("{id}")]
        public async Task<ActionResult<FileDto>> Patch(int id, [FromBody] FileUpdateModel updateModel)
        {
            var fileDto = _mapper.Map<FileDto>(updateModel);
            var result = await _fileService.UpdatePartialAsync(id, fileDto);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        // DELETE api/File/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            return await _fileService.DeleteFileAsync(id);
        }

        [HttpGet("folder/{folderId}")]
        public async Task<ActionResult<List<FileDto>>> GetFilesByFolderId(int folderId)
        {
            var files = await _fileService.GetFilesByFolderIdAsync(folderId);
            return files.ToList();
        }

        // GET api/File/presigned-url
        //[HttpGet("presigned-url")]
        //public async Task<IActionResult> GetPresignedUrl([FromQuery] FilePostModel file)
        //{
        //    string url = await _s3Service.GeneratePresignedUrlAsync(file.FileName ,file.FileType);
        //    FileDto fileDto = _mapper.Map<FileDto>(file);

        //   var f= _fileService.CreateFileAsync(fileDto);
        //    return Ok(new { url });
        //}

        [HttpGet("presigned-url")]
        public async Task<IActionResult> GetPresignedUrl([FromQuery] string s3Key,string fileType)
        {
            string url = await _s3Service.GeneratePresignedUrlAsync(s3Key,fileType);
            //FileDto fileDto = _mapper.Map<FileDto>(file);

            //var f = _fileService.CreateFileAsync(fileDto);
            return Ok(new { url });
        }


        [HttpGet("download/{fileName}")]
        public async Task<IActionResult> DownloadFile( string fileName)
        {
            // קבלת ה-URL להורדה
            string downloadUrl = await _s3Service.GetDownloadUrlAsync(fileName);

            if (string.IsNullOrEmpty(downloadUrl))
            {
                return NotFound(); 
            }

            return Ok(new { Url = downloadUrl }); 
        }


        //[HttpPut("{fileId}/softDelete")]
        //public async Task<IActionResult> SoftDelete(int fileId)
        //{
        //    try
        //    {
        //        await _fileService.SoftDeleteFileAsync(fileId);
        //        return Ok($"הקובץ עם ID {fileId} נמחק בהצלחה.");
        //    }
        //    catch (InvalidOperationException ex)
        //    {
        //        return NotFound(ex.Message+"טטטטטטטטטט"); // מחזיר 404 אם הקובץ לא נמצא
        //    }

        //}
        [HttpPut("{fileId}/softDelete")]
        public async Task<IActionResult> SoftDelete(int fileId)
        {
            try
            {
                var result = await _fileService.SoftDeleteFileAsync(fileId);
                if (!result)
                    return NotFound($"הקובץ עם ID {fileId} לא נמצא.");

                return Ok(true); // 204 - הצלחה, ללא תוכן
            }
            catch (Exception ex)
            {
                // אפשר להוסיף לוג כאן
                return StatusCode(500, $"ארעה שגיאה במחיקת הקובץ: {ex.Message}");
            }
        }

        [HttpGet("shared")]
        public async Task<ActionResult<List<FileDto>>> GetSharedFiles()
        {
            var files = await _fileService.GetSharedFilesAsync();
            return Ok(files);
        }

        //[HttpPut("{fileId}/rename")]
        //public async Task<ActionResult<FileDto>> Rename(int fileId, [FromBody] string newName)
        //{
        //    if (string.IsNullOrWhiteSpace(newName))
        //    {
        //        return BadRequest("The file name cannot be empty.");
        //    }

        //    var result = await _fileService.RenameFileAsync(fileId, newName);
        //    if (result == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(result);
        //}

    }

}