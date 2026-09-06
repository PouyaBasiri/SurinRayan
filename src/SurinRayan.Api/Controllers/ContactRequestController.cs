using MediatR;
using Microsoft.AspNetCore.Mvc;
using SurinRayan.Application.Common.Models;
using SurinRayan.Application.Contacts.Commands;
using SurinRayan.Application.Features.ContactRequests.Commands.MarkAsRead;
using SurinRayan.Application.Features.ContactRequests.Commands.ReplyContactRequest;
using SurinRayan.Application.Features.ContactRequests.DTOs;
using SurinRayan.Application.Features.ContactRequests.Queries.GetContactRequests;

namespace SurinRayan.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactRequestController : ApiControllerBase
{
    private readonly ISender _mediator;

    public ContactRequestController(ISender mediator)
    {
        _mediator = mediator;
    }
    [HttpPost]
    public async Task<ActionResult<Guid>> Create([FromBody] CreateContactRequestCommand command)
    {
        var id = await Mediator.Send(command);
        return Ok(new { id, message = "درخواست شما با موفقیت ثبت شد." });
    }

    [HttpGet]
    public async Task<ActionResult<PaginatedResult<ContactRequestDto>>> GetList(
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] bool? isRead = null)
    {
        var query = new GetContactRequestsQuery(pageNumber, pageSize, isRead);
        var result = await _mediator.Send(query);
        return Ok(result);
    }

    [HttpPatch("{id:guid}/read")]
    public async Task<IActionResult> MarkAsRead(Guid id)
    {
        var result = await _mediator.Send(new MarkContactRequestAsReadCommand(id));
        if (!result)
            return NotFound(new { message = "پیام مورد نظر یافت نشد." });

        return NoContent();
    }

    [HttpPost("{id:guid}/reply")]
    public async Task<IActionResult> Reply(Guid id, [FromBody] string replyMessage)
    {
        var command = new ReplyContactRequestCommand(id, replyMessage);
        var result = await _mediator.Send(command);

        if (!result)
            return NotFound(new { message = "پیام مورد نظر یافت نشد." });

        return Ok(new { message = "پاسخ با موفقیت ایمیل شد." });
    }
}