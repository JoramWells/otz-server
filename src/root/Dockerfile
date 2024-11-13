FROM node:21-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./

RUN yarn cache clean --force

RUN yarn install --timeout=600000

COPY . .

EXPOSE 5000

CMD [ "yarn", "start"]