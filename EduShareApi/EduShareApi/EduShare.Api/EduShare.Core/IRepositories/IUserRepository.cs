using EduShare.Core.Entities;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EduShare.Core.IRepositories
{
    public interface IUserRepository:IRepositoryGeneric<User>
    {
        Task<User> GetUserByEmailAsync(string email);
        Task<User> ValidateUserAsync(string email, string password);

    }
}
