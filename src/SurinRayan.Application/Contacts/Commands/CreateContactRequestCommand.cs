using MediatR;
using SurinRayan.Application.Common.Interfaces;
using SurinRayan.Application.Features.ContactRequests.DTOs;
using SurinRayan.Domain.Entities;
using SurinRayan.Domain.Events;

namespace SurinRayan.Application.Contacts.Commands;

public record CreateContactRequestCommand(
    string FullName,
    string Email,
    string PhoneNumber,
    string Subject,
    string Message
) : IRequest<Guid>;

public class CreateContactRequestCommandHandler : IRequestHandler<CreateContactRequestCommand, Guid>
{
    private readonly IApplicationDbContext _context;
    private readonly IPublisher _publisher;

    public CreateContactRequestCommandHandler(IApplicationDbContext context,IPublisher publisher)
    {
        _context = context;
        _publisher = publisher;
    }

    public async Task<Guid> Handle(CreateContactRequestCommand request, CancellationToken cancellationToken)
    {
        var entity = new ContactRequest
        {
            FullName = request.FullName,
            Email = request.Email,
            PhoneNumber = request.PhoneNumber,
            Subject = request.Subject,
            Message = request.Message
        };

        _context.ContactRequests.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        var dto = new ContactRequestDto
        {
            Id = entity.Id,
            FullName = entity.FullName,
            Email = entity.Email,
            PhoneNumber = entity.PhoneNumber,
            Subject = entity.Subject,
            Message = entity.Message,
            IsRead = entity.IsRead,
            CreatedAtUtc = entity.CreatedAtUtc
        };
        await _publisher.Publish(new ContactRequestCreatedEvent(dto), cancellationToken);

        return entity.Id;
    }
}