using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SurinRayan.Domain.Entities;

namespace SurinRayan.Infrastructure.Persistence.Configurations;

public class ContactRequestConfiguration : IEntityTypeConfiguration<ContactRequest>
{
    public void Configure(EntityTypeBuilder<ContactRequest> builder)
    {
        builder.HasKey(c => c.Id);
        builder.Property(c => c.FullName).HasMaxLength(150).IsRequired();
        builder.Property(c => c.Email).HasMaxLength(200).IsRequired();
        builder.Property(c => c.PhoneNumber).HasMaxLength(20).IsRequired();
        builder.Property(c => c.Subject).HasMaxLength(250).IsRequired();
        builder.Property(c => c.Message).HasMaxLength(2000).IsRequired();
        builder.HasQueryFilter(c => !c.IsDeleted);
    }
}