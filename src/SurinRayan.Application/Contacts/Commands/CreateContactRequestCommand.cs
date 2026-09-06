using MediatR;
using SurinRayan.Domain.Entities;
using SurinRayan.Application.Common.Interfaces;

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

    public CreateContactRequestCommandHandler(IApplicationDbContext context)
    {
        _context = context;
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

        return entity.Id;
    }
}