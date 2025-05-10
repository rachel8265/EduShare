using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EduShare.Data.Migrations
{
    /// <inheritdoc />
    public partial class updateUrlFileInFileTableMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "S3Key",
                table: "Files",
                newName: "FileUrl");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FileUrl",
                table: "Files",
                newName: "S3Key");
        }
    }
}
