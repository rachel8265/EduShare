using EduShare.Core.IRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Rating = EduShare.Core.Entities.Rating;

namespace EduShare.Data.Repository
{
    public class RatingRepository : IRatingRepository
    {
        private readonly DataContext _dataContext;

        public RatingRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<IEnumerable<Rating>> GetAllAsync()
        {
            return await _dataContext.Ratings.Include(r => r.File)
                                               //.Include(r => r.User)
                                               .ToListAsync();
        }

        public async Task<Rating> GetByIdAsync(int id)
        {
            return await _dataContext.Ratings.FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<Rating> CreateAsync(Rating rating)
        {
            await _dataContext.Ratings.AddAsync(rating);
            return rating;
        }

        public async Task<bool> UpdateAsync(int id, Rating rating)
        {
            var existRating = await GetByIdAsync(id);
            if (existRating == null)
                return false;

            existRating.RatingValue = rating.RatingValue;
            existRating.Comment = rating.Comment ?? existRating.Comment;
            existRating.UpdatedAt = DateTime.Now; // Update timestamp
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var rating = await GetByIdAsync(id);
            if (rating == null)
                return false;

            _dataContext.Ratings.Remove(rating);
            return true;
        }
    }
}
