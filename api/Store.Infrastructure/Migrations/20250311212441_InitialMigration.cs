using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Store.Infrastracture.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Product",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ProductGender = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ProductImageUri = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    ProductPrice = table.Column<decimal>(type: "money", nullable: false),
                    ProductDesc = table.Column<string>(type: "nvarchar(1024)", maxLength: 1024, nullable: true),
                    TimeStamp = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WebUser",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserEmail = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    UserPassword = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    UserFirstName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    UserLastName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    UserCity = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    UserStreet = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    UserNumber = table.Column<int>(type: "int", nullable: true),
                    UserZip = table.Column<string>(type: "nvarchar(6)", maxLength: 6, nullable: true),
                    UserPhone = table.Column<string>(type: "nvarchar(12)", maxLength: 12, nullable: true),
                    TimeStamp = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Cart",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    ProductSize = table.Column<string>(type: "nvarchar(2)", maxLength: 2, nullable: true)
                },
                constraints: table =>
                {
                    table.ForeignKey(
                        name: "FK_CartProduct_Product",
                        column: x => x.ProductId,
                        principalTable: "Product",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Cart_WebUser",
                        column: x => x.UserId,
                        principalTable: "WebUser",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cart_ProductId",
                table: "Cart",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Cart_UserId",
                table: "Cart",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Cart");

            migrationBuilder.DropTable(
                name: "Product");

            migrationBuilder.DropTable(
                name: "WebUser");
        }
    }
}
