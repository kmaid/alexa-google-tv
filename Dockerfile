FROM node:16-alpine

RUN apk update
RUN apk add android-tools

COPY . /alexa-google-tv
WORKDIR /alexa-google-tv

RUN yarn install
RUN yarn build

ENTRYPOINT yarn start
