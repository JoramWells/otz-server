FROM node:16-alpine

RUN mkdir -p /usr/src/app/_gateway
WORKDIR /usr/src/app/_gateway

COPY package.json ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

EXPOSE 5000

CMD [ "npm run", "start:services"]