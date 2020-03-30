FROM node:10 AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn install
COPY . .
EXPOSE 3000
CMD [ "yarn", "run", "start" ]