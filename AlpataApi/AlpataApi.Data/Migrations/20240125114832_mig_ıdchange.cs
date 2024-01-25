using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AlpataApi.Data.Migrations
{
    /// <inheritdoc />
    public partial class mig_ıdchange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MeetId",
                table: "Meets",
                newName: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Meets",
                newName: "MeetId");
        }
    }
}
