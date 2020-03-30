var http = require('./http');
const endpoint = '/containers';

const startTrip = (info) => http.post(endpoint, info);
const stopTrip = () => http.remove(endpoint);
const updateContainerTemp = (id) => http.put(`${endpoint}/${id}`);

module.exports = {
  startTrip,
  stopTrip,
  updateContainerTemp,
};
