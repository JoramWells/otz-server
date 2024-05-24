FROM node:21-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install 

COPY . .

EXPOSE 5008

CMD [ "yarn", "run", "dev"]