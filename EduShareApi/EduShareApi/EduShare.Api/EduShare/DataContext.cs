using EduShare.Core.Entities;
using Microsoft.EntityFrameworkCore;
using File = EduShare.Core.Entities.File;

namespace EduShare.Data
{
    public class DataContext : DbContext
    {
        public DbSet<File> Files { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Recommendation> Recommendations { get; set; }
        public DbSet<Topic> Topics { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Folder> Folders { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Recommendation>()
            //    .HasOne(r => r.File)
            //    .WithMany()
            //    .HasForeignKey(r => r.FileId)
            //    .OnDelete(DeleteBehavior.Cascade); // שיניתי ל-Cascade

            //modelBuilder.Entity<Recommendation>()
            //    .HasOne(r => r.User)
            //    .WithMany()
            //    .HasForeignKey(r => r.UserId)
            //    .OnDelete(DeleteBehavior.Cascade); // שיניתי ל-Cascade

       //     modelBuilder.Entity<Rating>()
       //         .HasOne(r => r.File)
       //         .WithMany()
       //         .HasForeignKey(r => r.FileId)
       //         .OnDelete(DeleteBehavior.Restrict); // שיניתי ל-Cascade
       //     modelBuilder.Entity<Rating>()
       //.HasOne(r => r.File)
       //.WithMany()
       //.HasForeignKey(r => r.FileId)
       //.OnDelete(DeleteBehavior.Cascade); // התאם לפי הצורך

            //modelBuilder.Entity<PermissionRole>()
            //    .HasMany(p => p.RolePermissions)
            //    .WithOne()
            //    .HasForeignKey(p => p.RolePermissionsId)
            //    .OnDelete(DeleteBehavior.Cascade); // התאם לפי הצורך

            //modelBuilder.Entity<Rating>()
            //    .HasOne(r => r.)
            //    .WithMany()
            //    .HasForeignKey(r => r.UserId)
            //  .OnDelete(DeleteBehavior.Restrict); // שיניתי ל-Cascade

            //        modelBuilder.Entity<Rating>()
            //.HasOne(r => r.File)
            //.WithMany(f => f.Ratings) // הנחה שיש לך רשימה של Ratings ב-File
            //.HasForeignKey(r => r.FileId)
            //.OnDelete(DeleteBehavior.Cascade);

            //modelBuilder.Entity<Rating>()
            //    .HasOne(r => r.User)
            //    .WithMany(u => u.Ratings) // הנחה שיש לך רשימה של Ratings ב-User
            //    .HasForeignKey(r => r.UserId)
            //    .OnDelete(DeleteBehavior.Cascade);

        }
    }
}
