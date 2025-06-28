#!/bin/bash

FRONTEND_IMAGE_NAME="lolanimus/shoppingcart-prod-frontend:$TAG"

az containerapp update \
    --name shoppingcart-prod-frontend \
    --resource-group ShoppingCart \
    --image docker.io/$FRONTEND_IMAGE_NAME
