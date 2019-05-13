FROM node:alpine as build
WORKDIR /app
RUN apk add --no-cache git
COPY package.json package-lock.json ./
RUN npm install
RUN npm audit fix
COPY index.js .

FROM node:alpine as run
COPY --from=build /app /app
WORKDIR /app

USER node
CMD npm start
