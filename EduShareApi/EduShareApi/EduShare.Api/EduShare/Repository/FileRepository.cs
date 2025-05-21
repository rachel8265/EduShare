using EduShare.Core.Entities;
using EduShare.Core.IRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using File = EduShare.Core.Entities.File;

namespace EduShare.Data.Repository
{
    public class FileRepository : IFileRopository
    {
        private readonly DataContext _dataContext;

        public FileRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<IEnumerable<File>> GetAllAsync()
        {
            return await _dataContext.Files.Include(f => f.User)
                                            .Include(f => f.Topic)
                                            .Include(f => f.Ratings)
                                            .Include(f => f.Recommendations)
                                            .ToListAsync();
        }

        public async Task<File> GetByIdAsync(int id)
        {
            return await _dataContext.Files.FirstOrDefaultAsync(f => f.Id == id);
        }

        public async Task<File> CreateAsync(File file)
        {
            await _dataContext.Files.AddAsync(file);
            return file;
        }

        //public async Task<bool> UpdateAsync(int id, File file)
        //{
        //    var existFile = await GetByIdAsync(id);
        //    if (existFile == null)
        //        return false;

        //    existFile.FileName = file.FileName ?? existFile.FileName;
        //    //existFile.FileUrl = file.FileUrl ?? existFile.FileUrl;
        //    //existFile.FileSize = file.FileSize > 0 ? file.FileSize : existFile.FileSize;
        //    //existFile.FileType = file.FileType ?? existFile.FileType;
        //    existFile.IsPublic = file.IsPublic;
        //    existFile.UpdatedAt = DateTime.Now; // Update timestamp
        //    _dataContext.Files.Update(existFile);
        //    return true;
        //}
        public async Task UpdateAsync(File file)
        {
                _dataContext.Files.Update(file);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var file = await GetByIdAsync(id);
            if (file == null)
                return false;

            _dataContext.Files.Remove(file);
            return true;
        }

        public async Task<IEnumerable<File>> GetSubfilesByParentIdAsync(int folderId)
        {
            return await _dataContext.Files
                .Where(f => f.FolderId == folderId&& !f.IsDeleted) 
                .Include(f => f.User)
                .Include(f => f.Topic)
                .Include(f => f.Ratings)
                .Include(f => f.Recommendations)
                .ToListAsync();
        }

        public async Task<IEnumerable<File>> GetRootFilesByUserIdAsync(int userId)
        {
            return await _dataContext.Files
                .Include(f => f.User) // כולל את המשתמש בעל התיקייה
                .Where(f => !f.IsDeleted && f.Folder == null && f.UserId == userId)
                .ToListAsync();
        }

        //public async Task<bool> SoftDeleteAsync(int id)
        //{
        //    var file = await GetByIdAsync(id);
        //    if (file == null)
        //        return false;

        //    file.IsDeleted = true; // שינוי ה-IsDeleted ל-true
        //    _dataContext.Files.Update(file);
        //    return true;
        //}

        //public async Task<IEnumerable<File>> GetSubfilesByFolderIdAsync(int folderId)
        //{
        //    return await _dataContext.Files
        //        .Where(f => f.TopicId == folderId && !f.IsDeleted)
        //        .ToListAsync();
        //}
        public async Task<IEnumerable<File>> GetSharedFilesAsync()
        {
            return await _dataContext.Files
                .Where(f => f.IsPublic && !f.IsDeleted) // או כל תנאי אחר שמגדיר "משותף"
                .Include(f => f.User)
                .Include(f => f.Topic)
                .Include(f => f.Ratings)
                .Include(f => f.Recommendations)
                .ToListAsync();
        }
    }
}
