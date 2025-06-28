#!/bin/bash

BACKEND_IMAGE_NAME="lolanimus/shoppingcart-prod-backend:$TAG"

az containerapp update \
    --name shoppingcart-prod-backend \
    --resource-group ShoppingCart \
    --image docker.io/$BACKEND_IMAGE_NAME