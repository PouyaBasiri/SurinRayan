using MediatR;
using Microsoft.AspNetCore.Mvc;
using SurinRayan.Application.Messages.Queries.GetMessages;

namespace SurinRayan.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MessagesController : ControllerBase
{
    private readonly ISender _sender;

    public MessagesController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet]
    public async Task<IActionResult> GetMessages(
        [FromQuery] string? searchTerm,
        [FromQuery] bool? isRead,
        [FromQuery] bool? isReplied,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10)
    {
        var query = new GetMessagesQuery(searchTerm, isRead, isReplied, pageNumber, pageSize);
        var result = await _sender.Send(query);
        return Ok(result);
    }
}