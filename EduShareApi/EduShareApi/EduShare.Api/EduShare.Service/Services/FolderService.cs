using AutoMapper;
using EduShare.Core.DTOs;
using EduShare.Core.Entities;
using EduShare.Core.IRepositories;
using EduShare.Core.IServices;
using EduShare.Data.Repository;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EduShare.Service.Services
{
    public class FolderService : IFolderService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public FolderService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public async Task<IEnumerable<FolderDto>> GetAllFoldersAsync()
        {
            var folders = await _repositoryManager.Folders.GetAllAsync();
            return _mapper.Map<IEnumerable<FolderDto>>(folders);
        }

        public async Task<FolderDto?> GetFolderByIdAsync(int id)
        {
            var folder = await _repositoryManager.Folders.GetByIdAsync(id);
            return _mapper.Map<FolderDto>(folder);
        }

        public async Task<FolderDto> CreateFolderAsync(FolderDto folderPostModel)
        {
            var folderEntity = _mapper.Map<Folder>(folderPostModel);
            await _repositoryManager.Folders.CreateAsync(folderEntity);
            await _repositoryManager.SaveAsync(); // שמירה על השינויים
            return _mapper.Map<FolderDto>(folderEntity);
        }

        //public async Task<bool> UpdateFolderAsync(int id, FolderDto folderPostModel)
        //{
        //    var existingFolder = await _repositoryManager.Folders.GetByIdAsync(id);
        //    if (existingFolder != null)
        //    {
        //        _mapper.Map(folderPostModel, existingFolder);
        //        await _repositoryManager.Folders.UpdateAsync(id,existingFolder);
        //        await _repositoryManager.SaveAsync(); // שמירה על השינויים
        //        return true;
        //    }
        //    return false;
        //}
        public async Task<FolderDto> UpdateFolderAsync(int id, FolderDto folderPostModel)
        {
            var existingFolder = await _repositoryManager.Folders.GetByIdAsync(id);
            if (existingFolder == null)
                return null;

            if (!string.IsNullOrWhiteSpace(folderPostModel.Name))
                existingFolder.Name = folderPostModel.Name;
            //if (folderPostModel.ParentFolderId.HasValue)
            //    existingFolder.ParentFolderId = folderPostModel.ParentFolderId.Value;

            existingFolder.UpdatedAt = DateTime.UtcNow;

            await _repositoryManager.Folders.UpdateAsync(existingFolder); // שם אתה לא צריך להעביר id
            await _repositoryManager.SaveAsync();
            return _mapper.Map<FolderDto>(existingFolder);

        }
        //public async Task<bool> DeleteFolderAsync(int id)
        //{
        //    var existingFolder = await _repositoryManager.Folders.GetByIdAsync(id);
        //    if (existingFolder != null)
        //    {
        //        await _repositoryManager.Folders.DeleteAsync(id);
        //        await _repositoryManager.SaveAsync(); // שמירה על השינויים
        //        return true;
        //    }
        //    return false;
        //}

        public async Task<bool> DeleteFolderAsync(int id)
        {
            return await _repositoryManager.Folders.DeleteAsync(id);
        }

        public async Task<bool> SoftDeleteFolderAsync(int id)
        {
            var folder = await _repositoryManager.Folders.GetByIdAsync(id);
            if (folder == null)
                return false;

            folder.IsDeleted = true;
            folder.UpdatedAt = DateTime.UtcNow;

            await _repositoryManager.Folders.UpdateAsync(folder);
            await _repositoryManager.SaveAsync();
            return true;
        }
        public async Task<FoldersAndFilesDto> GetSubfoldersAndFilesByFolderIdAsync(int folderId)
        {
            var folders = await _repositoryManager.Folders.GetAllAsync();
            var files = await _repositoryManager.Files.GetAllAsync();

            var filteredFolders = folders.Where(f => f.ParentFolderId == folderId).ToList();
            var filteredFiles = files.Where(f => f.TopicId == folderId).ToList();

            var result = new FoldersAndFilesDto
            {
                Folders = _mapper.Map<IEnumerable<FolderDto>>(filteredFolders),
                Files = _mapper.Map<IEnumerable<FileDto>>(filteredFiles)
            };

            return result;
        }


        public async Task<FoldersAndFilesDto> GetRootFoldersByUserIdAsync(int userId)
        {
            //var folders = await _repositoryManager.Folders.GetRootFoldersByUserIdAsync(userId);
            //return _mapper.Map<IEnumerable<FolderDto>>(folders);
            var folders = await _repositoryManager.Folders.GetRootFoldersByUserIdAsync(userId);
            var files = await _repositoryManager.Files.GetRootFilesByUserIdAsync(userId);

            //var filteredFolders = folders.Where(f => f.ParentFolderId == null&&f.UserId==userId).ToList();
            //var filteredFiles = files.Where(f => f.Folder == null && f.UserId == userId).ToList();

            var result = new FoldersAndFilesDto
            {
                Folders = _mapper.Map<IEnumerable<FolderDto>>(folders),
                Files = _mapper.Map<IEnumerable<FileDto>>(files)
                //Folders = _mapper.Map<IEnumerable<FolderDto>>(filteredFolders),
                //Files = _mapper.Map<IEnumerable<FileDto>>(filteredFiles)
            };

            return result;
        }

        //public async Task<FolderDto> RenameFolderAsync(int id, string newName)
        //{
        //    var folder = await _repositoryManager.Folders.GetByIdAsync(id);
        //    if (folder == null)
        //        return null;

        //    folder.Name = newName;
        //    await _repositoryManager.Folders.UpdateAsync( folder);
        //    await _repositoryManager.SaveAsync();
        //    return _mapper.Map<FolderDto>(folder);
             
        //}

        public async Task<bool> DeleteFolderRecursivelyAsync(int id)
        {
            var folder = await _repositoryManager.Folders.GetByIdAsync(id);
            if (folder == null)
                return false;

            // Get all subfolders
            var subfolders = await _repositoryManager.Folders.GetSubfoldersByParentIdAsync(id);

            // Recursively delete all subfolders
            foreach (var subfolder in subfolders)
            {
                await DeleteFolderRecursivelyAsync(subfolder.Id);
            }

            // Get all files in this folder
            var files = await _repositoryManager.Files.GetSubfilesByParentIdAsync(id);

            // Mark all files as deleted
            foreach (var file in files)
            {
                file.IsDeleted = true;
                file.UpdatedAt = DateTime.UtcNow;
                await _repositoryManager.Files.UpdateAsync( file);
            }

            // Mark the folder itself as deleted
            folder.IsDeleted = true;
            folder.UpdatedAt = DateTime.UtcNow;
            await _repositoryManager.Folders.UpdateAsync( folder);

            await _repositoryManager.SaveAsync();
            return true;
        }
    }
}
