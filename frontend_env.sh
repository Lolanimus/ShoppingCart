#!/bin/sh
# cert and key dirs respectively
mkdir /etc/nginx/public/
mkdir /etc/nginx/private/

# downloads cert
if [ ! -f /etc/nginx/public/lolan-shoppingcart.com.crt ]; then
    curl -o /etc/nginx/public/lolan-shoppingcart.com.crt https://storage.googleapis.com/shopping-cart-bucket/cert/lolan-shoppingcart.com.crt 
fi

# creating a key from env var, then deleting the env var right after the key has been created
echo "$lolan_shoppingcart_com_rsa" > /etc/nginx/private/lolan-shoppingcart.com.rsa
chmod 600 /etc/nginx/private/lolan-shoppingcart.com.rsa
unset lolan_shoppingcart_com_rsa

# incerts all env vars into frontend
for i in $(env)
do
    key=$(echo "$i" | cut -d '=' -f 1)
    value=$(echo "$i" | cut -d '=' -f 2-)

    # Substitute values in JS and CSS files
    find /usr/share/nginx/html -type f \( -name '*.js' -o -name '*.css' \) -exec sed -i "s|$key|$value|g" '{}' +

    echo "Previewing replacements for: ${key} → ${value}"
    find /usr/share/nginx/html -type f \( -name '*.js' -o -name '*.css' \) \
        -exec grep -H "${key}" '{}' +
done

if [ ${ENVIRONMENT} == "Development" ]; then
    export API_URL=http://${BASE_SERVER_NAME}:${BACKEND_P}; else
    export API_URL=https://api.${BASE_SERVER_NAME}
fi

echo "API_URL:"
echo $API_URL

#incerts the following env vars into nginx conf
envsubst '
    ${CONTAINER_APP_PORT} 
    ${BASE_SERVER_NAME} 
    ${BACKEND_P}
    ${API_URL}
' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf
