FROM node:16-alpine

RUN mkdir -p /usr/src/app/Patient
WORKDIR /usr/src/app/Patient

COPY package.json ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

EXPOSE 5001

CMD [ "yarn", "start"]