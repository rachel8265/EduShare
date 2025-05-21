using EduShare.Core.Entities;
using EduShare.Core.IRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EduShare.Data.Repository
{
    public class FolderRepository : IFolderRepository
    {
        private readonly DataContext _context;

        public FolderRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Folder>> GetAllAsync()
        {
            return await _context.Folders
                .Include(f => f.User) // כולל את המשתמש בעל התיקייה
                .Where(f => !f.IsDeleted)
                .ToListAsync();
        }

        public async Task<Folder> GetByIdAsync(int id)
        {
            return await _context.Folders
                .Include(f => f.User) // כולל את המשתמש בעל התיקייה
                .FirstOrDefaultAsync(f => f.Id == id);
        }

        public async Task<Folder> CreateAsync(Folder folder)
        {
            await _context.Folders.AddAsync(folder);
            return folder;
        }

        //public async Task<bool> UpdateAsync(int id, Folder folder)
        //{
        //    var existingFolder = await GetByIdAsync(id);
        //    if (existingFolder == null)
        //        return false;

        //    existingFolder.Name = folder.Name;
        //    existingFolder.ParentFolderId = folder.ParentFolderId;
        //    existingFolder.UserId = folder.UserId;
        //    existingFolder.UpdatedAt = DateTime.UtcNow; // Update timestamp
        //    return true;
        //}

        public async Task UpdateAsync(Folder folder)
        {
            _context.Folders.Update(folder);
            await _context.SaveChangesAsync();
        }

        //public async Task<bool> DeleteAsync(int id)
        //{
        //    var folder = await GetByIdAsync(id);
        //    if (folder == null)
        //        return false;

        //    folder.IsDeleted = true; // מחיקה רכה
        //    await UpdateAsync(folder.Id, folder);
        //    return true;
        //}

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.Files.FindAsync(id);
            if (entity == null)
                return false;

            _context.Files.Remove(entity);
            return true;
        }

        public async Task<IEnumerable<Folder>> GetRootFoldersByUserIdAsync(int userId)
        {
            return await _context.Folders
                .Include(f => f.User) // כולל את המשתמש בעל התיקייה
                .Where(f => !f.IsDeleted && f.ParentFolderId == null && f.UserId == userId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Folder>> GetSubfoldersByParentIdAsync(int parentId)
        {
            return await _context.Folders
                .Include(f => f.User) // כולל את המשתמש בעל התיקייה
                .Where(f => !f.IsDeleted && f.ParentFolderId == parentId)
                .ToListAsync();
        }
    }
}
