FROM node:14.15

COPY . /app
WORKDIR /app

RUN npm install

