using Microsoft.AspNetCore.SignalR;
using SurinRayan.Application.Common.Interfaces;
using SurinRayan.Application.Features.ContactRequests.DTOs;
using SurinRayan.Infrastructure.Hubs;
using System;
using System.Collections.Generic;
using System.Text;

namespace SurinRayan.Infrastructure.Services
{
    public class NotificationService : INotificationService
    {
        private readonly IHubContext<NotificationHub, INotificationClient> _hubContext;

        public NotificationService(IHubContext<NotificationHub, INotificationClient> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task NotifyNewContactRequestAsync(ContactRequestDto contactRequest, CancellationToken cancellationToken = default)
        {
            await _hubContext.Clients.Group("Admins").ReceiveNewContactRequest(contactRequest);
        }
    }
}
