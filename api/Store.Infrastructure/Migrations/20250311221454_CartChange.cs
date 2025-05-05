using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Store.Infrastracture.Migrations
{
    /// <inheritdoc />
    public partial class CartChange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Cart",
                newName: "Id");

            migrationBuilder.RenameIndex(
                name: "IX_Cart_UserId",
                table: "Cart",
                newName: "IX_Cart_Id");

            migrationBuilder.AddColumn<byte[]>(
                name: "TimeStamp",
                table: "Cart",
                type: "rowversion",
                rowVersion: true,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TimeStamp",
                table: "Cart");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Cart",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Cart_Id",
                table: "Cart",
                newName: "IX_Cart_UserId");
        }
    }
}
