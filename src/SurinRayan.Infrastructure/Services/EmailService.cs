using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using MimeKit;
using SurinRayan.Application.Common.Interfaces;
using SurinRayan.Application.Common.Models;

namespace SurinRayan.Infrastructure.Services;

public class EmailService : IEmailService
{
    private readonly IConfiguration _config;

    public EmailService(IConfiguration config)
    {
        _config = config;
    }

    public async Task SendEmailAsync(string to, string subject, string body, CancellationToken cancellationToken = default)
    {
        //var message = new MimeMessage();

        //var host = _config["EmailSettings:Host"];
        //var port = int.Parse(_config["EmailSettings:SmtpPort"] ?? "587");
        //var senderEmail = _config["EmailSettings:SenderEmail"];
        //var password = _config["EmailSettings:Password"];
        //var sendername = _config["EmailSettings:SenderName"];
        //var enablessl = bool.Parse(_config["EmailSettings:EnableSsl"] ?? "true");
        //var smtpServer = _config["EmailSettings:SmtpServer"];
        //var username = _config["EmailSettings:Username"];

        //// فرستنده
        //message.From.Add(new MailboxAddress(sendername, senderEmail));
        //// گیرنده
        //message.To.Add(MailboxAddress.Parse(to));
        //// موضوع
        //message.Subject = subject;

        //// بدنه ایمیل (HTML)
        //var bodyBuilder = new BodyBuilder
        //{
        //    HtmlBody = body
        //};
        //message.Body = bodyBuilder.ToMessageBody();

        //using var client = new SmtpClient();

        //// اتصال به سرور SMTP
        //var secureOption = enablessl
        //    ? SecureSocketOptions.StartTls
        //    : SecureSocketOptions.None;

        //await client.ConnectAsync(smtpServer, port, secureOption, cancellationToken);

        //// اعتبارسنجی
        //if (!string.IsNullOrEmpty(username))
        //{
        //    await client.AuthenticateAsync(username, password, cancellationToken);
        //}

        //await client.SendAsync(message, cancellationToken);
        //await client.DisconnectAsync(true, cancellationToken);
        Console.WriteLine($"[SIMULATED EMAIL] To: {to} | Subject: {subject}");

        await Task.CompletedTask;
    }
}