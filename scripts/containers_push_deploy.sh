#!/bin/bash
if [ "$TAG" = "v1.0" ]; then
    export TAG="latest"
else
    export TAG="v1.0"
fi

bash ./docker_compose_push.sh
yes | bash ./deploy_to_azure.sh