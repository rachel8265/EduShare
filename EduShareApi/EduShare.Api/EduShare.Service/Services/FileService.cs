using AutoMapper;
using EduShare.Core.DTOs;
using EduShare.Core.Entities;
using EduShare.Core.IRepositories;
using EduShare.Core.IServices;
using EduShare.Data;
using EduShare.Data.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;
using File = EduShare.Core.Entities.File;

namespace EduShare.Service.Services
{
    public class FileService : IFileService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        private readonly IAIService _aiService;
        private readonly IS3Service _s3Service;

        public FileService(IRepositoryManager repositoryManager, IMapper mapper, IAIService aiService,IS3Service s3Service)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _aiService = aiService;
            _s3Service = s3Service;
        }

        public async Task<IEnumerable<FileDto>> GetAllFilesAsync()
        {
            var files = await _repositoryManager.Files.GetAllAsync();
            return _mapper.Map<IEnumerable<FileDto>>(files);
        }

        public async Task<FileDto?> GetFileByIdAsync(int id)
        {
            var file = await _repositoryManager.Files.GetByIdAsync(id);
            return _mapper.Map<FileDto>(file);
        }

        //public async Task<FileDto> CreateFileAsync(FileDto fileObj)
        //{
        //    //הבדיקהכן לא משמעותית
        //    //var existingFile = await _repositoryManager.Files.GetByIdAsync((int)fileObj.Id);
        //    //if (existingFile == null)
        //    //{
        //    //    var fileEntity = _mapper.Map<File>(fileObj);
        //    //    await _repositoryManager.Files.CreateAsync(fileEntity);
        //    //    await _repositoryManager.SaveAsync();
        //    //    return _mapper.Map<FileDto>(fileEntity);
        //    ////}
        //    //return null;

        //    if (!string.IsNullOrEmpty(fileObj.FileUrl))
        //    {
        //        string text = await _s3Service.GetFileTextContentAsync(fileObj.FileUrl);
        //        int? topicId = await _aiService.PredictTopicIdAsync(text);
        //        if (topicId.HasValue)
        //        {
        //            fileObj.TopicId = topicId.Value;
        //        }
        //    }

        //    var existingFile = await _repositoryManager.Files.GetByIdAsync((int)fileObj.Id);
        //    if (existingFile == null)
        //    {
        //        var fileEntity = _mapper.Map<File>(fileObj);
        //        await _repositoryManager.Files.CreateAsync(fileEntity);
        //        await _repositoryManager.SaveAsync();
        //        return _mapper.Map<FileDto>(fileEntity);
        //    }
        //    return null;
        //}
        //}
      public async Task<FileDto> CreateFileAsync(FileDto fileObj)
        {
            // קבל את תוכן הקובץ מה־S3
            var fileBytes = await _s3Service.GetFileBytesAsync(fileObj.FileUrl);

            // חילוץ טקסט
            string text = FileTextExtractor.ExtractText(fileObj.FileName, fileBytes);

            // שלח ל־AI
            int? topicId = null;
            if (!string.IsNullOrWhiteSpace(text))
            {
                topicId = await _aiService.PredictTopicIdAsync(text);
            }
            fileObj.TopicId = topicId;

            // יצירה ושמירה במסד הנתונים
            var fileEntity = _mapper.Map<File>(fileObj);
            await _repositoryManager.Files.CreateAsync(fileEntity);
            await _repositoryManager.SaveAsync();
            return _mapper.Map<FileDto>(fileEntity);
        }

        public async Task<FileDto> UpdateFileAsync(int id, FileDto fileObj)
        {
            var existFile = await _repositoryManager.Files.GetByIdAsync(id);
            if (existFile != null)
            {
                var fileEntity = _mapper.Map<File>(fileObj);
                await _repositoryManager.Files.UpdateAsync( fileEntity);
                await _repositoryManager.SaveAsync();
                var fileDTO= _mapper.Map<FileDto>(fileEntity);

                return fileDTO;
            }
            return null;
        }
        public async Task<FileDto> UpdatePartialAsync(int id, FileDto updateModel)
        {
            var existFile = await _repositoryManager.Files.GetByIdAsync(id);
            if (existFile == null)
                return null;

            if (!string.IsNullOrWhiteSpace(updateModel.FileName))
                existFile.FileName = updateModel.FileName;

            if (updateModel.IsPublic != null)
                existFile.IsPublic = updateModel.IsPublic;

            if (updateModel.TopicId != null)
                existFile.TopicId = updateModel.TopicId; // עדכון נושא

            // Update additional fields only if provided  

            existFile.UpdatedAt = DateTime.UtcNow; // Always update timestamp  
            await _repositoryManager.Files.UpdateAsync(existFile);
            await _repositoryManager.SaveAsync();
            return _mapper.Map<FileDto>(existFile);
        }

        public async Task<bool> DeleteFileAsync(int id)
        {
            var file = await _repositoryManager.Files.GetByIdAsync(id);
            if (file != null)
            {
                await _repositoryManager.Files.DeleteAsync(id);
                await _repositoryManager.SaveAsync();
                return true;
            }
            return false;
        }

        public async Task<IEnumerable<FileDto>> GetFilesByFolderIdAsync(int folderId)
        {
            var files = await _repositoryManager.Files.GetSubfilesByParentIdAsync(folderId);
            return _mapper.Map<IEnumerable<FileDto>>(files);
        }

        public async Task<IEnumerable<FileDto>> GetRootFilesByUserIdAsync(int userId)
        {
            var files = await _repositoryManager.Files.GetRootFilesByUserIdAsync(userId);
            return _mapper.Map<IEnumerable<FileDto>>(files);
        }

        public async Task<bool> SoftDeleteFileAsync(int id)
        {
            var file = await _repositoryManager.Files.GetByIdAsync(id);
            if (file == null)
                return false;

            file.IsDeleted = true;
            await _repositoryManager.Files.UpdateAsync( file);

            await _repositoryManager.SaveAsync();
            return true;
        }

        public async Task<IEnumerable<FileDto>> GetSharedFilesAsync()
        {
            var files = await _repositoryManager.Files.GetSharedFilesAsync();
            return _mapper.Map<IEnumerable<FileDto>>(files);
        }
        //public async Task<FileDto?> RenameFileAsync(int id, string newName)
        //{
        //    var file = await _repositoryManager.Files.GetByIdAsync(id);
        //    if (file == null)
        //        return null;

        //    file.FileName = newName;
        //    await _repositoryManager.Files.UpdateAsync(id, file);
        //    await _repositoryManager.SaveAsync();
        //    return _mapper.Map<FileDto>(file);

        //}


    }
}
