#!/bin/bash
cd pragmabrewery/
yarn install 
yarn run testWithCoverage

cd ../breweryApi/
yarn install
arn run test