FROM alpine:3.21.3 AS build

RUN apk update && apk add nodejs npm

RUN mkdir -p /app

WORKDIR /app

# ADD https://github.com/Lolanimus/ShoppingCart.git /app
COPY . /app

RUN npm install

RUN npm run build

FROM nginx:alpine

COPY /nginx/nginx.conf /etc/nginx/conf.d/configfile.template
ENV PORT=8080
ENV HOST=0.0.0.0
RUN sh -c "envsubst '\$PORT'  < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf"

COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]