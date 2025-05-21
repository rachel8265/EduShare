using EduShare.Core.DTOs;
using EduShare.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EduShare.Core.IRepositories
{
    public interface IFileService
    {
        Task<IEnumerable<FileDto>> GetAllFilesAsync();
        Task<FileDto> GetFileByIdAsync(int id);
        Task<FileDto> CreateFileAsync(FileDto file);
        Task<FileDto> UpdateFileAsync(int id, FileDto file);
        Task<bool> DeleteFileAsync(int id);
        Task<IEnumerable<FileDto>> GetFilesByFolderIdAsync(int folderId);
        Task<bool> SoftDeleteFileAsync(int id);
        //Task<FileDto> RenameFileAsync(int id, string newName);
        Task<FileDto> UpdatePartialAsync(int id, FileDto updateModel);
        Task<IEnumerable<FileDto>> GetSharedFilesAsync();



    }
}
