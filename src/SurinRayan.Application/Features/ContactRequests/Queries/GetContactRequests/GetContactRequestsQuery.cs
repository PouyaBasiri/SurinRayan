using MediatR;
using SurinRayan.Application.Common.Models;
using SurinRayan.Application.Features.ContactRequests.DTOs;

namespace SurinRayan.Application.Features.ContactRequests.Queries.GetContactRequests;

public record GetContactRequestsQuery(
    int PageNumber = 1,
    int PageSize = 10,
    bool? IsRead = null
) : IRequest<PaginatedResult<ContactRequestDto>>;