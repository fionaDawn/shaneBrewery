FROM node:10 AS build
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN yarn install
EXPOSE 5000
CMD [ "yarn", "run", "start" ]