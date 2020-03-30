var Container = require('../services/containerService');
var Beer = require('../services/beerService');
var util = require('../util/util');
var sensor = require('../services/pragmaSensor');
var {
  emptyResponse,
  invalidRequest,
  notFound,
  sendEventsToAll,
  successResponse
} = require('../views/containerView');

const clearContainer = (_req, res) => {
  emptyResponse(res, Container.clear());
};

const createContainerSet = (req, res) => {
  if (Object.keys(Container.getAll()).length === 0) {
    const body = req.body;
    if (body.hasOwnProperty('info')) {
      let id = 1;
      const containers = Object.entries(body.info).reduce(
        (acc, [key, val], _idx) => {
          let i = 0;
          while (i < val) {
            const beer = Beer.get(key);
            if (util.isBeerValid(beer)) {
              acc[id] = Container.create({
                id: id,
                name: beer.name,
                beerId: beer.id,
                temperature: beer.defaultTemp,
                tempInRange: true
              });
              id++;
            }
            i++;
          }
          return acc;
        },
        {}
      );
      sendEventsToAll(res, containers);
    } else {
      invalidRequest(res, 'Info cannot be empty');
    }
  } else {
    invalidRequest(res, 'There is a trip in progress');
  }
};

const getContainers = (_req, res) => {
  successResponse(res, Container.getAll());
};

const updateContainer = (req, res) => {
  const containerId = req.params.containerId;
  const container = Container.get(containerId);
  const beer = container ? Beer.get(container.beerId) : null;
  if (util.isContainerValid(container) && util.isBeerValid(beer)) {
    sensor.getCurrentTemperature(containerId).then((r) => {
      Container.updateTemperature(container, beer, r.temperature);
      const containers = Container.update(container);
      sendEventsToAll(res, containers);
    });
  } else notFound(res);
};

const manuallyUpdateContainer = (req, res) => {
  const containerId = req.params.containerId;
  const body = req.body;
  const container = Container.get(containerId);
  const beer = container ? Beer.get(container.beerId) : null;
  // const manualTempInput = body.hasOwnProperty("temperature");
  if (util.isContainerValid(container) && util.isBeerValid(beer)) {
    const temp = body.temperature;
    Container.updateTemperature(container, beer, temp);
    const containers = Container.update(container);
    sendEventsToAll(res, containers);
  } else notFound(res);
};

const removeContainer = (req, res) => {
  const containerId = req.params.containerId;
  const container = Container.get(containerId);
  if (util.isContainerValid(container)) {
    emptyResponse(res, Container.remove(containerId));
  } else notFound(res);
};

module.exports = {
  createContainerSet,
  clearContainer,
  getContainers,
  manuallyUpdateContainer,
  removeContainer: removeContainer,
  updateContainer: updateContainer
};
