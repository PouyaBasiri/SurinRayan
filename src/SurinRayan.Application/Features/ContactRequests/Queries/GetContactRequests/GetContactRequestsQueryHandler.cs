using MediatR;
using Microsoft.EntityFrameworkCore;
using SurinRayan.Application.Common.Interfaces;
using SurinRayan.Application.Common.Models;
using SurinRayan.Application.Features.ContactRequests.DTOs;

namespace SurinRayan.Application.Features.ContactRequests.Queries.GetContactRequests;

public class GetContactRequestsQueryHandler
    : IRequestHandler<GetContactRequestsQuery, PaginatedResult<ContactRequestDto>>
{
    private readonly IApplicationDbContext _context;

    public GetContactRequestsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PaginatedResult<ContactRequestDto>> Handle(
        GetContactRequestsQuery request,
        CancellationToken cancellationToken)
    {
        var query = _context.ContactRequests.AsNoTracking();

        if (request.IsRead.HasValue)
        {
            query = query.Where(x => x.IsRead == request.IsRead.Value);
        }

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(x => x.CreatedAt)
            .Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(x => new ContactRequestDto
            {
                Id = x.Id,
                FullName = x.FullName,
                Email = x.Email,
                PhoneNumber = x.PhoneNumber,
                Subject = x.Subject,
                Message = x.Message,
                IsRead = x.IsRead,
                CreatedAt = x.CreatedAt,
                CreatedAtUtc = x.CreatedAtUtc
            })
            .ToListAsync(cancellationToken);

        return new PaginatedResult<ContactRequestDto>(items, totalCount, request.PageNumber, request.PageSize);
    }
}