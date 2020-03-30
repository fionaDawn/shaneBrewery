var schemas = require('./schemas.js');
var _ = require('lodash');
var beers = require('../mockDb/beers.json');

const Beer = function (data) {
  this.data = this.sanitize(data);
};

Beer.prototype.data = {};

Beer.prototype.sanitize = (data) => {
  const schema = schemas.beer;
  return _.pick(_.defaults(data, schema), _.keys(schema));
};

Beer.findById = (id) => new Beer(beers[id]);

module.exports = Beer;
