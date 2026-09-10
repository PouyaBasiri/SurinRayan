using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SurinRayan.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddIsRepliedAndCreatedAtUtcToContactRequest : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAtUtc",
                table: "ContactRequests",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsReplied",
                table: "ContactRequests",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAtUtc",
                table: "ContactRequests");

            migrationBuilder.DropColumn(
                name: "IsReplied",
                table: "ContactRequests");
        }
    }
}
