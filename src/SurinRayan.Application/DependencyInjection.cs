using System.Reflection;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using SurinRayan.Application.Common.Behaviors;

namespace SurinRayan.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        var assembly = Assembly.GetExecutingAssembly();

        services.AddValidatorsFromAssembly(assembly);

        services.AddMediatR(cfg =>
        {
            cfg.RegisterServicesFromAssemblies(assembly);
            cfg.AddOpenBehavior(typeof(ValidationBehavior<,>)); 
        });


        return services;
    }
}