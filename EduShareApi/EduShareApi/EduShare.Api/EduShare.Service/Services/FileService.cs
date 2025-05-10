using AutoMapper;
using EduShare.Core.DTOs;
using EduShare.Core.Entities;
using EduShare.Core.IRepositories;
using EduShare.Core.IServices;
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

        public async Task<bool> UpdateFileAsync(int id, FileDto fileObj)
        {
            var existingFile = await _repositoryManager.Files.GetByIdAsync(id);
            if (existingFile != null)
            {
                var fileEntity = _mapper.Map<File>(fileObj);
                await _repositoryManager.Files.UpdateAsync(id, fileEntity);
                await _repositoryManager.SaveAsync();
                return true;
            }
            return false;
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
            await _repositoryManager.Files.UpdateAsync(id, file);

            await _repositoryManager.SaveAsync();
            return true;
        }

        public async Task<FileDto?> RenameFileAsync(int id, string newName)
        {
            var file = await _repositoryManager.Files.GetByIdAsync(id);
            if (file == null)
                return null;

            file.FileName = newName;
            await _repositoryManager.Files.UpdateAsync(id, file);
            await _repositoryManager.SaveAsync();
            return _mapper.Map<FileDto>(file);

        }
    }
}
