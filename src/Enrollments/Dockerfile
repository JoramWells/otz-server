FROM node:22-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./

RUN yarn cache clean --force

RUN yarn install

COPY . .

EXPOSE 5007

CMD [ "yarn","run" ,"dev"]
