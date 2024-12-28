FROM node:23-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN npm cache clean --force

RUN pnpm install

COPY . .

EXPOSE 5001

CMD [ "pnpm","run" ,"dev"]
