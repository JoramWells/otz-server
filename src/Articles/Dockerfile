FROM node:22-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install 

COPY . .

EXPOSE 5009

CMD [ "yarn", "run", "dev"]