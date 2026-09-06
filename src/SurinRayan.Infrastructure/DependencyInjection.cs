using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SurinRayan.Application.Common.Interfaces;
using SurinRayan.Application.Common.Models;
using SurinRayan.Infrastructure.Persistence;
using SurinRayan.Infrastructure.Services;

namespace SurinRayan.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");

        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(connectionString, b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));

        services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());


        //services.Configure<EmailSettings>(configuration.GetSection("EmailSettings"));
        //services.AddTransient<IEmailService, EmailService>();
        return services;
    }
}