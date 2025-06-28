#!/bin/bash

# incerts all env vars into frontend
declare -A allowed_map=(
  [BASE_SERVER_NAME]=1
  [CONTAINER_APP_PORT]=1
  [BACKEND_P]=1
  [ENVIRONMENT]=1
)

# Loop over all environment variables
while IFS='=' read -r key value; do
  if [ "${allowed_map[$key]+_}" ]; then
    echo "Processing $key = $value"

    # Substitute values in JS and CSS files
    find /usr/share/nginx/html -type f \( -name '*.js' -o -name '*.css' \) -exec sed -i "s|$key|$value|g" '{}' +

    echo "Previewing replacements for: ${key} → ${value}"
    find /usr/share/nginx/html -type f \( -name '*.js' -o -name '*.css' \) \
    -exec grep -H "${key}" '{}' +
  fi
done < <(env)

echo $BASE_SERVER_NAME

#incerts the following env vars into nginx conf
envsubst '
    ${CONTAINER_APP_PORT} 
    ${BASE_SERVER_NAME} 
    ${BACKEND_P}
    ${ENVIRONMENT}
' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf