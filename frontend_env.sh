#!/bin/sh
set -e /etc/nginx/public/

echo this is an update

mkdir /etc/nginx/public/

if [ ! -f /etc/nginx/public/lolan-shoppingcart.com.crt ]; then
    curl -o /etc/nginx/public/lolan-shoppingcart.com.crt https://storage.googleapis.com/shopping-cart-bucket/cert/lolan-shoppingcart.com.crt 
fi

for i in $(env)
do
    key=$(echo $i | cut -d '=' -f 1)
    value=$(echo $i | cut -d '=' -f 2-)
    echo $key=$value
    # sed All files
    # find /usr/share/nginx/html -type f -exec sed -i "s|${key}|${value}|g" '{}' +

    # sed JS and CSS only
    find /usr/share/nginx/html -type f \( -name '*.js' -o -name '*.css' \) -exec sed -i "s|${key}|${value}|g" '{}' +
done

envsubst '$PORT $BASE_SERVER_NAME $BACKEND_PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf
