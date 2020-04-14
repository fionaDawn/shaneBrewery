#!/bin/bash
cd shanebrewery/
yarn install 
yarn run testWithCoverage

cd ../breweryApi/
yarn install
arn run test