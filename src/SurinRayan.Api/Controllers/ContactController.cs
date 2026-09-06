using Microsoft.AspNetCore.Mvc;
using SurinRayan.Application.Contacts.Commands;

namespace SurinRayan.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ApiControllerBase
{
    [HttpPost]
    public async Task<ActionResult<Guid>> Create([FromBody] CreateContactRequestCommand command)
    {
        var id = await Mediator.Send(command);
        return Ok(new { id, message = "درخواست شما با موفقیت ثبت شد." });
    }
}