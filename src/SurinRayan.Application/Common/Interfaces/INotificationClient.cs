using System;
using System.Collections.Generic;
using System.Text;

namespace SurinRayan.Application.Common.Interfaces
{
    public interface INotificationClient
    {
        Task ReceiveNewContactRequest(object contactRequestDto);
        Task ContactRequestStatusChanged(Guid id, bool isRead, bool isReplied);
    }
}
