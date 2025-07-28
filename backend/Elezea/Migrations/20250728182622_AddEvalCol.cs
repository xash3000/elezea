using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Elezea.Migrations
{
    /// <inheritdoc />
    public partial class AddEvalCol : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Evaluated",
                table: "Submissions",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Evaluated",
                table: "Submissions");
        }
    }
}
