FROM node:22-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn cache clean --force

RUN yarn install 

COPY . .

EXPOSE 5008

CMD [ "yarn", "run", "dev"]