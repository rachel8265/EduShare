using EduShare.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduShare.Core.IServices
{

    public interface IFolderService
    {
        Task<IEnumerable<FolderDto>> GetAllFoldersAsync();
        Task<FolderDto> GetFolderByIdAsync(int id);
        Task<FolderDto> CreateFolderAsync(FolderDto folder);
        Task<FolderDto> UpdateFolderAsync(int id, FolderDto folder);
        Task<bool> DeleteFolderAsync(int id);
        Task<FoldersAndFilesDto> GetSubfoldersAndFilesByFolderIdAsync(int folderId);
        //Task<IEnumerable<FolderDto>> GetRootFoldersByUserIdAsync(int userId);
        Task<FoldersAndFilesDto> GetRootFoldersByUserIdAsync(int userId);
        //Task<FolderDto> RenameFolderAsync(int id, string newName);
        Task<bool> DeleteFolderRecursivelyAsync(int id);

    }
}

