var http = require('./http');

const getCurrentTemperature = (containerId) => http.get(`/${containerId}`);

module.exports = { getCurrentTemperature };
