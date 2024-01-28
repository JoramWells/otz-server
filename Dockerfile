FROM node:16-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

EXPOSE 5002

# CMD [ "yarn", "start"]