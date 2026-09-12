using MediatR;
using SurinRayan.Application.Common.Interfaces;

namespace SurinRayan.Application.Features.ContactRequests.Commands.ReplyContactRequest;

public class ReplyContactRequestCommandHandler : IRequestHandler<ReplyContactRequestCommand, bool>
{
    private readonly IApplicationDbContext _context;
    private readonly IEmailService _emailService;

    public ReplyContactRequestCommandHandler(IApplicationDbContext context, IEmailService emailService)
    {
        _context = context;
        _emailService = emailService;
    }

    public async Task<bool> Handle(ReplyContactRequestCommand request, CancellationToken cancellationToken)
    {
        var contactRequest = await _context.ContactRequests
            .FindAsync(new object[] { request.ContactRequestId }, cancellationToken);

        if (contactRequest == null)
            return false;

        string emailSubject = $"پاسخ به درخواست شما: {contactRequest.Subject}";
        string emailBody = $"""
            <div dir="rtl" style="font-family: Tahoma, Arial, sans-serif; line-height: 1.8; color: #333;">
                <h2>با سلام {contactRequest.FullName} عزیز،</h2>
                <p>پاسخ شما در خصوص موضوع <strong>«{contactRequest.Subject}»</strong> به شرح زیر می‌باشد:</p>
                <div style="background-color: #f5f5f5; padding: 15px; border-right: 4px solid #007bff; margin: 15px 0;">
                    {request.ReplyMessage.Replace("\n", "<br/>")}
                </div>
                <hr style="border: none; border-top: 1px solid #eee;" />
                <p style="font-size: 12px; color: #777;">تیم پشتیبانی سورین رایان</p>
            </div>
            """;

        await _emailService.SendEmailAsync(contactRequest.Email, emailSubject, emailBody, cancellationToken);

        contactRequest.IsRead = true;
        contactRequest.IsReplied = true;
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}