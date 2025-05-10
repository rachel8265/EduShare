using EduShare.Core.IRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using User = EduShare.Core.Entities.User;

namespace EduShare.Data.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _dataContext;

        public UserRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _dataContext.Users.Include(u => u.Files)
                                            //.Include(u => u.Ratings)
                                            //.Include(u => u.Recommendations)
                                            .ToListAsync();
        }

        public async Task<User> GetByIdAsync(int id)
        {
            return await _dataContext.Users.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User> CreateAsync(User user)
        {
            await _dataContext.Users.AddAsync(user);
            return user;
        }

        public async Task<bool> UpdateAsync(int id, User user)
        {
            var existUser = await GetByIdAsync(id);
            if (existUser == null)
                return false;

            existUser.Email = user.Email ?? existUser.Email;
            existUser.FullName = user.FullName ?? existUser.FullName;
            existUser.Password = user.Password ?? existUser.Password;
            existUser.UpdatedAt = DateTime.Now; // Update timestamp
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var user = await GetByIdAsync(id);
            if (user == null)
                return false;

            _dataContext.Users.Remove(user);
            return true;
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            var user = await _dataContext.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
                return null;
            return user;
        }
        public async Task<User> ValidateUserAsync(string email, string password)
        {
            return await _dataContext.Users.SingleOrDefaultAsync(u => u.Email == email && u.Password == password);
        }
    }
}
