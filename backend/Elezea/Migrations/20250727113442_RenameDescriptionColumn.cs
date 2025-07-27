using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Elezea.Migrations
{
    /// <inheritdoc />
    public partial class RenameDescriptionColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Submissions",
                newName: "UserDescription");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserDescription",
                table: "Submissions",
                newName: "Description");
        }
    }
}
