using EduShare.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using File = EduShare.Core.Entities.File;

namespace EduShare.Core.IRepositories
{
    public interface IFileRopository:IRepositoryGeneric<File>
    {
        Task<IEnumerable<File>> GetSubfilesByParentIdAsync(int folderId);
        Task<IEnumerable<File>> GetRootFilesByUserIdAsync(int userId);
        Task<IEnumerable<File>> GetSharedFilesAsync();

        //Task<IEnumerable<File>> GetSubfilesByFolderIdAsync(int folderId);
        //Task<bool> SoftDeleteAsync(int id);



    }
}
