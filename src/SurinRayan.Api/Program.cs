using SurinRayan.Application;
using SurinRayan.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices(builder.Configuration);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// کانفیگ ساده و استاندارد Swagger بدون ابهام در OpenApiInfo
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new()
    {
        Title = "SurinRayan Corporate API",
        Version = "v1",
        Description = "API services for surinrayan.ir platform"
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "SurinRayan API v1"));
}

app.UseHttpsRedirection();
app.UseCors("AllowNextJs");
app.UseAuthorization();
app.MapControllers();

app.Run();