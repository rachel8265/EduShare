//using EduShare.Core.IRepositories;
//using Microsoft.EntityFrameworkCore;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace EduShare.Data.Repository
//{
//    public class RepositoryGeneric<T> : IRepositoryGeneric<T> where T : class
//    {
//        private readonly DbSet<T> _dbSet;

//        public RepositoryGeneric(DataContext context)
//        {
//            _dbSet = context.Set<T>();
//        }
//        public T Add(T entity)
//        {
//            _dbSet.Add(entity);
//            return entity;
//        }

//        public void Create(T entity)
//        {
//            throw new NotImplementedException();
//        }

//        public bool Delete(int id)
//        {
//            _dbSet.Remove(GetById(id));
//            return true;
//        }

//        public IEnumerable<T> GetAll()
//        {
//            return _dbSet.ToList();
//        }

//        public T? GetById(int id)
//        {
//            return _dbSet.Find(id);
//        }

//        public void Update(T entity)
//        {
//            throw new NotImplementedException();
//        }

//        void IRepositoryGeneric<T>.Delete(int id)
//        {
//            throw new NotImplementedException();
//        }



//        //public bool Update(T entity,int id)
//        //{
//        //    returen _dbSet.Update(entity);
//        //   // return entity;
//        //}


//    }

//}
