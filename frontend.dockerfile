FROM alpine:3.21.3

RUN apk update && apk add nodejs npm

RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

CMD ["npm", "run", "dev"]