using MediatR;

namespace SurinRayan.Application.Messages.Queries.GetMessages;

public record GetMessagesQuery(
    string? SearchTerm,
    bool? IsRead,
    bool? IsReplied,
    int PageNumber = 1,
    int PageSize = 10
) : IRequest<PagedList<MessageDto>>;

public record MessageDto(
    Guid Id,
    string FullName,
    string Email,
    string PhoneNumber,
    string Subject,
    string Message,
    bool IsRead,
    bool IsReplied,
    DateTime CreatedAtUtc
);

public record PagedList<T>(
    List<T> Items,
    int PageNumber,
    int PageSize,
    int TotalCount
)
{
    public bool HasNextPage => PageNumber * PageSize < TotalCount;
    public bool HasPreviousPage => PageNumber > 1;
}