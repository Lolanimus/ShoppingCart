#!/bin/bash

# Get the environment from the first argument
ENVIRONMENT=$1

if [ "$ENVIRONMENT" == "Development" ]; then
    echo "Running in Development environment"
    docker run -d -p 6379:6379 redis
    docker run -e "ACCEPT_EULA=Y" -e -p 5433:1433 --name StoreDb -h StoreDbHost -d mcr.microsoft.com/mssql/server:2019-latest
    # Add your Development-specific logic here
elif [ "$ENVIRONMENT" == "Production" ]; then
    echo "Running in Production environment"
    # Add your Production-specific logic here
else
    echo "Unknown environment: $ENVIRONMENT"
    # Handle other cases if needed
fi