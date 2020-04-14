#!/bin/bash

# install dependencies for ui
cd shanebrewery/
yarn install

cd ../thermometerSensor/
yarn install

# navigate to api and install dependencies
cd ../breweryApi/
yarn install

cd ..

docker-compose build
docker-compose up