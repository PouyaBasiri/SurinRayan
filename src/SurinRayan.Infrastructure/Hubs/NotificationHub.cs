using Microsoft.AspNetCore.SignalR;
using SurinRayan.Application.Common.Interfaces;

namespace SurinRayan.Infrastructure.Hubs
{
    public class NotificationHub :Hub<INotificationClient>
    {
        public override async Task OnConnectedAsync()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "Admins");
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "Admins");
            await base.OnDisconnectedAsync(exception);
        }
    }
}
