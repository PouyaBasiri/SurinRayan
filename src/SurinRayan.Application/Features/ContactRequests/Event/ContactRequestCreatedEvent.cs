using MediatR;
using SurinRayan.Application.Features.ContactRequests.DTOs;

namespace SurinRayan.Domain.Events
{
    public class ContactRequestCreatedEvent : INotification
    {
        public ContactRequestDto ContactRequest { get; }

        public ContactRequestCreatedEvent(ContactRequestDto contactRequest)
        {
            ContactRequest = contactRequest;
        }
    }
}
