FROM node:22-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./


RUN yarn install

COPY . .

EXPOSE 5004

CMD [ "yarn", "start"]