using Microsoft.AspNetCore.Mvc;
using SurinRayan.Application.Health.Queries;

namespace SurinRayan.Api.Controllers;

public class HealthController : ApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<HealthStatusDto>> GetStatus(CancellationToken cancellationToken)
    {
        var result = await Mediator.Send(new GetHealthStatusQuery(), cancellationToken);
        return Ok(result);
    }
}