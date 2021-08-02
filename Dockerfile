FROM node:16.6.0-alpine as build
LABEL org.opencontainers.image.source https://github.com/chrisns/iot-broadlink
WORKDIR /app
RUN apk add --no-cache git
COPY package.json package-lock.json ./
RUN npm install
RUN npm audit fix
COPY index.js .

FROM node:16.6.0-alpine as run
COPY --from=build /app /app
WORKDIR /app

USER node
CMD npm start
