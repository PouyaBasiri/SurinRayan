using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.AI;
using SurinRayan.Api.DTOs;
using System.Text;

namespace SurinRayan.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SupportChatController : ControllerBase
{
    private readonly IChatClient _chatClient;
    private readonly ILogger<SupportChatController> _logger;

    public SupportChatController(IChatClient chatClient, ILogger<SupportChatController> logger)
    {
        _chatClient = chatClient;
        _logger = logger;
    }

    [HttpPost("stream")]
    public async Task StreamChat([FromBody] ChatRequestDto request, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.UserMessage))
        {
            Response.StatusCode = StatusCodes.Status400BadRequest;
            return;
        }

        Response.ContentType = "text/plain; charset=utf-8";
        Response.Headers.Append("Cache-Control", "no-cache");
        Response.Headers.Append("Connection", "keep-alive");

        string companyKnowledgeBase = """
            شرکت: سورین رایان (Surin Rayan)
            حوزه فعالیت: طراحی و توسعه نرم‌افزارهای تحت وب، برنامه‌نویسی .NET و Next.js، راه‌اندازی زیرساخت‌های ابری و DevOps.
            ساعات کاری: شنبه تا چهارشنبه از ساعت ۹ صبح تا ۱۸ عصر.
            راه ارتباطی: ایمیل info@surinrayan.com و فرم ثبت درخواست تماس در سایت.
            """;

        var messages = new List<ChatMessage>
        {
            new(ChatRole.System, $"""
                تو دستیار پشتیبانی هوشمند و محترم شرکت «سورین رایان» هستی.
                وظیفه تو پاسخگویی کوتاه، دقیق و راهنمایی کاربران است.
                فقط بر اساس دانش زیر پاسخ بده و اگر پاسخ سوالی را نمیدانی، کاربر را به فرم ثبت درخواست تماس در سایت هدایت کن.
                
                دانش پایه:
                {companyKnowledgeBase}
                """),
            new(ChatRole.User, request.UserMessage)
        };
        var chatOptions = new ChatOptions
        {
            MaxOutputTokens = 1000 
        };
        try
        {
            // 👈 استفاده از GetStreamingResponseAsync به جای CompleteStreamingAsync
            await foreach (ChatResponseUpdate update in _chatClient.GetStreamingResponseAsync(messages, chatOptions, cancellationToken: cancellationToken))
            {
                if (!string.IsNullOrEmpty(update.Text))
                {
                    byte[] buffer = Encoding.UTF8.GetBytes(update.Text);
                    await Response.Body.WriteAsync(buffer, cancellationToken);
                    await Response.Body.FlushAsync(cancellationToken);
                }
            }
        }
        catch (OperationCanceledException)
        {
            _logger.LogInformation("ارتباط استریم چت توسط کاربر قطع شد.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "خطا در فراخوانی مدل هوش مصنوعی.");
            byte[] errorBuffer = Encoding.UTF8.GetBytes("\n[متأسفانه در دریافت پاسخ خطایی رخ داد.]");
            await Response.Body.WriteAsync(errorBuffer, CancellationToken.None);
        }
    }
}