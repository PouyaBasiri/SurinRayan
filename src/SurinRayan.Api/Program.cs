using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.AI;
using Microsoft.IdentityModel.Tokens;
using OpenAI;
using OpenAI.Chat;
using SurinRayan.Application;
using SurinRayan.Application.Common.Interfaces;
using SurinRayan.Infrastructure;
using SurinRayan.Infrastructure.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

string openRouterKey = "sk-or-v1-YOUR_OPENAI_API_KEY_HERE";

var chatOptions = new ChatOptions
{
    MaxOutputTokens = 1000 
};


var options = new OpenAIClientOptions
{
    Endpoint = new Uri("https://openrouter.ai/api/v1")
};

var openAiClient = new OpenAIClient(new System.ClientModel.ApiKeyCredential(openRouterKey), options);
ChatClient chatClient = openAiClient.GetChatClient("google/gemini-3.1-flash-lite");
IChatClient aiChatClient = chatClient.AsIChatClient();

builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices(builder.Configuration);

builder.Services.AddSignalR();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddTransient<IEmailService, EmailService>();
builder.Services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();
builder.Services.AddSingleton<IChatClient>(aiChatClient);

var jwtKey = builder.Configuration["JwtSettings:SecretKey"]!;
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
        ValidAudience = builder.Configuration["JwtSettings:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
    };
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNextJS", policy =>
    {
        policy.WithOrigins(
                "http://localhost:3000",
                "https://localhost:3000",
                "http://localhost:5000",
                "https://localhost:7054"
              )
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

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
else
{
    app.UseHttpsRedirection();
}

app.UseRouting();
app.UseCors("AllowNextJS");
app.UseCors("SignalRCorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<SurinRayan.Infrastructure.Hubs.NotificationHub>("/hubs/notifications");

app.Run();