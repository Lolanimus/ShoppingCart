FROM mcr.microsoft.com/dotnet/sdk:8.0 AS base

WORKDIR /app
EXPOSE $PORT
ENV DOTNET_NUGET_SIGNATURE_VERIFICATION=false

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY [".", "./"]
RUN dotnet restore

COPY . .
WORKDIR /src/Store.Web
RUN dotnet publish -c Release -o /app/publish

# Copy everything
FROM base AS final
WORKDIR /app
COPY ./entrypoint.sh .
RUN chmod +x entrypoint.sh
COPY --from=build /app/publish .
ENTRYPOINT ["./entrypoint.sh"]