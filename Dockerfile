FROM node:alpine as builder
RUN apk add --no-cache git
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm i --silent
RUN npm audit fix

FROM node:alpine
COPY --from=builder /app /app
WORKDIR /app 
COPY index.js .

CMD npm start
