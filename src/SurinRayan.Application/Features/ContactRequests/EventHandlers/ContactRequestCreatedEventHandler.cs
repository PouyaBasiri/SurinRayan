using MediatR;
using SurinRayan.Application.Common.Interfaces;
using SurinRayan.Domain.Events;
using System;
using System.Collections.Generic;
using System.Text;

namespace SurinRayan.Application.Features.ContactRequests.EventHandlers
{
    public class ContactRequestCreatedEventHandler : INotificationHandler<ContactRequestCreatedEvent>
    {
        private readonly INotificationService _notificationService;

        public ContactRequestCreatedEventHandler(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        public async Task Handle(ContactRequestCreatedEvent notification, CancellationToken cancellationToken)
        {
            await _notificationService.NotifyNewContactRequestAsync(notification.ContactRequest, cancellationToken);
        }
    }
}
