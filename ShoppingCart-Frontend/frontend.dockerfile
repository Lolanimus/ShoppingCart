FROM alpine:3.21.3

RUN apk update && apk add nodejs npm

RUN mkdir -p /app

WORKDIR /app

COPY ./package*.json ./

COPY ./tsconfig*.json ./

COPY ./tests ./

COPY ./frontend ./frontend

COPY ./setup.ts ./

COPY ./vite.config.ts ./

COPY ./index.html ./

RUN npm install

RUN npm run build

CMD ["npm", "run", "dev"]