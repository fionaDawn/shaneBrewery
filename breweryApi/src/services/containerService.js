var Container = require('../models/container');
var util = require('../util/util');

const create = (container) => {
  const newContainer = new Container(container).data;
  const containers = getAll();
  // if id already exist, set the id as the last added id + 1
  const id = get(newContainer.id)
    ? Object.keys(containers).length + 1
    : newContainer.id;

  Container.setContainers({
    ...containers,
    [id]: {
      ...newContainer,
      id: id,
    },
  });
  return newContainer;
};

const get = (id) => Container.findById(id);

const getAll = () => Container.getAll();

const update = (container) => Container.update(container);

const updateTemperature = (container, beer, temp) => {
  container.setTemperature(temp);
  container.setTempInRange(util.isBeerTempInRange(beer, temp));
};

const remove = (containerId) => Container.remove(containerId);

const clear = () => Container.clear();

module.exports = {
  create,
  clear,
  get,
  getAll,
  update,
  updateTemperature,
  remove,
};
