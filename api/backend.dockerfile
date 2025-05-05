FROM mcr.microsoft.com/dotnet/sdk:8.0@sha256:483d6f3faa583c93d522c4ca9ee54e08e535cb112dceb252b2fbb7ef94839cc8 AS build
WORKDIR /app

# Copy everything
COPY . ./
# Restore as distinct layers
RUN dotnet restore
# Build and publish a release
RUN dotnet publish -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0@sha256:e223bd5d93b3042215c7aed59568933631121f7ff4f5268a5092ab54a7e20136
WORKDIR /app
COPY --from=build /app/out .
ENTRYPOINT ["dotnet", "DotNet.Docker.dll"]