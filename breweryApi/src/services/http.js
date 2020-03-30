var fetch = require('node-fetch');

const host = 'https://temperature-sensor-service.herokuapp.com/sensor';

const get = (path) =>
  fetch(`${host}${path}`, {
    credentials: 'omit',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      'sec-fetch-mode': 'cors',
    },
    method: 'GET',
    mode: 'cors',
  })
    .then((response) => response.json())
    .then((data) => data);

const http = {
  get: get,
};

module.exports = http;
