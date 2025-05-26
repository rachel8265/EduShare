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

        public FileService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
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

        public async Task<FileDto> CreateFileAsync(FileDto fileObj)
        {
            var existingFile = await _repositoryManager.Files.GetByIdAsync((int)fileObj.Id);
            if (existingFile == null)
            {
                var fileEntity = _mapper.Map<File>(fileObj);
                await _repositoryManager.Files.CreateAsync(fileEntity);
                await _repositoryManager.SaveAsync();
                return _mapper.Map<FileDto>(fileEntity);
            }
            return null;
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
            _repositoryManager.Files.UpdateAsync(existFile);
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
