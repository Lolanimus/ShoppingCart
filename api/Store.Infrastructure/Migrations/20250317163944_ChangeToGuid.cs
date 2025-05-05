using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Store.Infrastracture.Migrations
{
    /// <inheritdoc />
    public partial class ChangeToGuid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cart_WebUser",
                table: "Cart");

            migrationBuilder.DropIndex(
                name: "IX_Cart_Id",
                table: "Cart");

            migrationBuilder.RenameTable(
                name: "Cart",
                newName: "CartProduct");

            migrationBuilder.RenameIndex(
                name: "IX_Cart_ProductId",
                table: "CartProduct",
                newName: "IX_CartProduct_ProductId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CartProduct",
                table: "CartProduct",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CartProduct_WebUser",
                table: "CartProduct",
                column: "Id",
                principalTable: "WebUser",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartProduct_WebUser",
                table: "CartProduct");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CartProduct",
                table: "CartProduct");

            migrationBuilder.RenameTable(
                name: "CartProduct",
                newName: "Cart");

            migrationBuilder.RenameIndex(
                name: "IX_CartProduct_ProductId",
                table: "Cart",
                newName: "IX_Cart_ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Cart_Id",
                table: "Cart",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Cart_WebUser",
                table: "Cart",
                column: "Id",
                principalTable: "WebUser",
                principalColumn: "Id");
        }
    }
}
