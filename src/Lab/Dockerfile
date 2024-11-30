FROM node:22-alpine


WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN npm cache clean --force

RUN pnpm install


COPY . .

EXPOSE 5002

CMD [ "npm","run", "dev"]