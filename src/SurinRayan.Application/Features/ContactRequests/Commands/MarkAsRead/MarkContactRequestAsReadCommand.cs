using MediatR;

namespace SurinRayan.Application.Features.ContactRequests.Commands.MarkAsRead;

public record MarkContactRequestAsReadCommand(Guid Id) : IRequest<bool>;