FROM alpine:3.21.3 AS base
RUN apk update && apk add nodejs npm
RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run test

FROM base AS dev
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM base AS build
RUN npm run build

FROM nginx:alpine AS prod
COPY /nginx/nginx.conf /etc/nginx/conf.d/configfile.template
COPY frontend_env.sh /docker-entrypoint.d
RUN chmod +x /docker-entrypoint.d/frontend_env.sh
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE $PORT
CMD ["nginx", "-g", "daemon off;"]