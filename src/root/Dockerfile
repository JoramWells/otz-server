FROM node:21-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 5000

CMD [ "yarn", "start"]