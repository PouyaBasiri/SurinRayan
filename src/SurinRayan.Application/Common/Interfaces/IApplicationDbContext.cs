using Microsoft.EntityFrameworkCore;
using SurinRayan.Domain.Entities;

namespace SurinRayan.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<ContactRequest> ContactRequests { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}