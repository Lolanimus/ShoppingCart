#!/bin/sh
if [ -f /app/.env ]; then
  export $(grep -v '^#' /app/.env | xargs)
fi

envsubst '$PORT $BASE_SERVER_NAME' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf

exec nginx -g "daemon off;"