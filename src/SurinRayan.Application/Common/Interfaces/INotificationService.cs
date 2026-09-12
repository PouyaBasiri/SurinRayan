using SurinRayan.Application.Features.ContactRequests.DTOs;

namespace SurinRayan.Application.Common.Interfaces
{
    public interface INotificationService
    {
        Task NotifyNewContactRequestAsync(ContactRequestDto contactRequest, CancellationToken cancellationToken = default);
    }
}
