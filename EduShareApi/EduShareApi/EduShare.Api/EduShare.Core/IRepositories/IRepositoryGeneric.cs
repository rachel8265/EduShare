﻿using System.Collections.Generic;
using System.Threading.Tasks;

namespace EduShare.Core.IRepositories
{
    public interface IRepositoryGeneric<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<T> GetByIdAsync(int id);
        Task<T> CreateAsync(T entity);
        Task<bool> UpdateAsync(int id, T entity);
        Task<bool> DeleteAsync(int id);
        // Task SaveAsync();
    }
}
