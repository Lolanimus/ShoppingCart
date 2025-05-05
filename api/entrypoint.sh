#!/bin/bash

if [ "$ASPNETCORE_ENVIRONMENT" != "Development" ]; then
    export ConnectionStrings__DefaultConnection="Server=tcp:${AZURE_SQL_HOST},${AZURE_SQL_PORT};Initial Catalog=${AZURE_SQL_DATABASE};Persist Security Info=False;User ID=${AZURE_SQL_USERNAME};Password=${AZURE_SQL_PASSWORD};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
fi

dotnet Store.Web.dll