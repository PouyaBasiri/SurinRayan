using MediatR;
using SurinRayan.Application.Common.Interfaces;

namespace SurinRayan.Application.Features.ContactRequests.Commands.MarkAsRead;

public class MarkContactRequestAsReadCommandHandler
    : IRequestHandler<MarkContactRequestAsReadCommand, bool>
{
    private readonly IApplicationDbContext _context;

    public MarkContactRequestAsReadCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> Handle(
        MarkContactRequestAsReadCommand request,
        CancellationToken cancellationToken)
    {
        var contactRequest = await _context.ContactRequests
            .FindAsync(new object[] { request.Id }, cancellationToken);

        if (contactRequest == null)
            return false;

        contactRequest.IsRead = true;
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}