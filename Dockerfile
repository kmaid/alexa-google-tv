FROM node:16-alpine

RUN apk update
RUN apk add android-tools

COPY . /alexa-chromecast
WORKDIR /alexa-chromecast

RUN yarn install
RUN yarn build

ENTRYPOINT yarn start
