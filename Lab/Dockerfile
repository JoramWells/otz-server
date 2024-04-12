FROM node:20-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./

RUN npm install 

COPY . .

EXPOSE 5002

CMD [ "yarn", "start"]