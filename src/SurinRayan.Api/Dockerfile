FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["src/SurinRayan.Api/SurinRayan.Api.csproj", "src/SurinRayan.Api/"]
COPY ["src/SurinRayan.Application/SurinRayan.Application.csproj", "src/SurinRayan.Application/"]
COPY ["src/SurinRayan.Domain/SurinRayan.Domain.csproj", "src/SurinRayan.Domain/"]
COPY ["src/SurinRayan.Infrastructure/SurinRayan.Infrastructure.csproj", "src/SurinRayan.Infrastructure/"]

RUN dotnet restore "src/SurinRayan.Api/SurinRayan.Api.csproj"

COPY . .

WORKDIR "/src/src/SurinRayan.Api"
RUN dotnet publish "SurinRayan.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80

ENTRYPOINT ["dotnet", "SurinRayan.Api.dll"]