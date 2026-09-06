using MediatR;
using SurinRayan.Application.Common.Interfaces;

namespace SurinRayan.Application.Health.Queries;

public record GetHealthStatusQuery : IRequest<HealthStatusDto>;

public record HealthStatusDto(string Status, string Framework, DateTime Timestamp);

public class GetHealthStatusQueryHandler : IRequestHandler<GetHealthStatusQuery, HealthStatusDto>
{
    public Task<HealthStatusDto> Handle(GetHealthStatusQuery request, CancellationToken cancellationToken)
    {
        var result = new HealthStatusDto(
            Status: "Healthy",
            Framework: ".NET 10.0",
            Timestamp: DateTime.UtcNow
        );

        return Task.FromResult(result);
    }
}