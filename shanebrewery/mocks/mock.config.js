import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import dotenv from 'dotenv';
dotenv.config();

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);

global.BASE_API_URL = process.env.REACT_APP_BREWERYTRIP_URL
  ? process.env.REACT_APP_BREWERYTRIP_URL
  : 'http://localhost:5000';

global.BASE_API_CONTAINER_URL = process.env.REACT_APP_BREWERYAPI_URL
  ? process.env.REACT_APP_BREWERYAPI_URL
  : 'http://localhost:3000';

const deliveryInfo = {
  id: 1,
  info: {
    '1': 2,
    '3': 1
  }
};
const deliveryInfoDup = {
  id: 2,
  info: {
    '1': 2,
    '3': 1
  }
};

const containers = {
  '1': {
    id: 1,
    name: 'Pilsner',
    beerId: '1',
    temperature: 5,
    tempInRange: true
  },
  '2': {
    id: 2,
    name: 'Wheat',
    beerId: '5',
    temperature: 6,
    tempInRange: false
  }
};

mock
  .onPost(`${BASE_API_URL}/breweryTrip`, {})
  .reply(422, 'Unprocessable Entity');
mock.onPost(`${BASE_API_URL}/breweryTrip`, deliveryInfo).reply(201, 'Success');
mock
  .onPost(`${BASE_API_URL}/breweryTrip`, deliveryInfoDup)
  .reply(422, 'Unprocessable Entity');
mock.onDelete(`${BASE_API_URL}/breweryTrip`).reply(201, 'Success');
mock
  .onDelete(`${BASE_API_CONTAINER_URL}/breweryApi/containers/1`)
  .reply(204, 'Success');
mock.onDelete(`${BASE_API_CONTAINER_URL}/breweryApi/containers/2`).reply(422);

module.exports = {
  mock: mock,
  sampleData: {
    deliveryInfo,
    deliveryInfoDup,
    containers
  }
};

mock = null;
