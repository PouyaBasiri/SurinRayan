using MediatR;
using Microsoft.EntityFrameworkCore;
using SurinRayan.Application.Common.Interfaces; // اینترفیس DbContext شما

namespace SurinRayan.Application.Messages.Queries.GetMessages;

public class GetMessagesQueryHandler : IRequestHandler<GetMessagesQuery, PagedList<MessageDto>>
{
    private readonly IApplicationDbContext _context;

    public GetMessagesQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PagedList<MessageDto>> Handle(GetMessagesQuery request, CancellationToken cancellationToken)
    {
        var query = _context.ContactRequests.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(request.SearchTerm))
        {
            var term = request.SearchTerm.Trim().ToLower();
            query = query.Where(m =>
                m.FullName.ToLower().Contains(term) ||
                m.Email.ToLower().Contains(term) ||
                m.Subject.ToLower().Contains(term));
        }

        if (request.IsRead.HasValue)
        {
            query = query.Where(m => m.IsRead == request.IsRead.Value);
        }

        if (request.IsReplied.HasValue)
        {
            query = query.Where(m => m.IsReplied == request.IsReplied.Value);
        }

        var totalCount = await query.CountAsync(cancellationToken);

        var items = await query
            .OrderByDescending(m => m.CreatedAtUtc)
            .Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(m => new MessageDto(
                m.Id,
                m.FullName,
                m.Email,
                m.PhoneNumber,
                m.Subject,
                m.Message,
                m.IsRead,
                m.IsReplied,
                m.CreatedAtUtc))
            .ToListAsync(cancellationToken);

        return new PagedList<MessageDto>(items, request.PageNumber, request.PageSize, totalCount);
    }
}