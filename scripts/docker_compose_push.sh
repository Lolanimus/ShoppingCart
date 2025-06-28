#!/bin/bash

export ENVIRONMENT="Production"
export BASE_SERVER_NAME="lolan-shoppingcart.com"
FRONTEND_IMAGE_NAME="lolanimus/shoppingcart-prod-frontend:$TAG"
BACKEND_IMAGE_NAME="lolanimus/shoppingcart-prod-backend:$TAG"

# building and running frontend and backend container through docker compose
docker compose up -d --build frontend backend

# creating images to push from docker compose frontend and backend containers
docker commit shoppingcart-frontend $FRONTEND_IMAGE_NAME
docker commit shoppingcart-backend $BACKEND_IMAGE_NAME

# pushing those images to docker hub
docker push $FRONTEND_IMAGE_NAME
docker push $BACKEND_IMAGE_NAME
