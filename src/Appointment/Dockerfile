FROM node:22-alpine

RUN npm install pnpm -g

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install 

COPY . .

EXPOSE 5005

CMD [ "pnpm", "run", "dev"]