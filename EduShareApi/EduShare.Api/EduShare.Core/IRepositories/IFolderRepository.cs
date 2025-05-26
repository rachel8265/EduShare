using EduShare.Core.DTOs;
using EduShare.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduShare.Core.IRepositories
{
    public interface IFolderRepository:IRepositoryGeneric<Folder>
    {
        Task<IEnumerable<Folder>> GetRootFoldersByUserIdAsync(int userId);
        Task<IEnumerable<Folder>> GetSubfoldersByParentIdAsync(int parentId);
        //Task<Folder> GetByIdAsync(int id);
        //Task<IEnumerable<Folder>> GetAllAsync();
        //Task AddAsync(Folder folder);
        //Task UpdateAsync(Folder folder);
        //Task DeleteAsync(int id);
    }
}
