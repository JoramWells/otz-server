FROM node:22-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn cache clean --force

RUN yarn install 

COPY . .

EXPOSE 5002

CMD [ "npm","run", "dev"]