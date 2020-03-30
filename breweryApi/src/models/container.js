var schemas = require('./schemas.js');
var _ = require('lodash');
this.containers = {};

var Container = function (data) {
  this.data = this.sanitize(data);
};

Container.prototype.sanitize = (data) => {
  const schema = schemas.container;
  return _.pick(_.defaults(data, schema), _.keys(schema));
};

Container.prototype.setTemperature = function (temp) {
  this.data.temperature = temp;
};

Container.prototype.setTempInRange = function (bool) {
  this.data.tempInRange = bool;
};

Container.clear = () => (this.containers = {});

Container.findById = (containerId) => {
  if (this.containers && this.containers.hasOwnProperty(containerId))
    return new Container(this.containers[containerId]);
  else return null;
};

Container.getAll = () => this.containers;

Container.remove = (containerId) => {
  delete this.containers[containerId];
  return this.containers;
};

Container.setContainers = (containers) => (this.containers = containers);

Container.update = (container) =>
  Object.assign(this.containers, { [container.data.id]: container.data });

module.exports = Container;
