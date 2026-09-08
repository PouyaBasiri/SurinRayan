using MediatR;

namespace SurinRayan.Application.Features.ContactRequests.Commands.ReplyContactRequest;

public record ReplyContactRequestCommand(Guid ContactRequestId,string ReplyMessage) : IRequest<bool>;