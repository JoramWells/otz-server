FROM node:18-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./


RUN yarn install

COPY . .

EXPOSE 5001

CMD [ "yarn", "start"]