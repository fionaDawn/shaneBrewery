const schemas = {
  beer: {
    id: '',
    name: '',
    minTemp: 0,
    maxTemp: 0,
    defaultTemp: 0,
  },
  container: {
    id: '',
    name: '',
    beerId: '',
    temperature: 0,
    tempInRange: false,
  },
};

module.exports = schemas;
