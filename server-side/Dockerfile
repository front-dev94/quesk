FROM node:12

USER root

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY run.sh