var Beer = require('../models/beer');

const get = (id) => Beer.findById(id).data;

module.exports = {
  get,
};
