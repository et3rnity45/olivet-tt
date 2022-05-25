FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install
COPY . ./

CMD yarn dev
