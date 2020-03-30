var express = require('express');
var containerRouter = express.Router();
var {
  clearContainer,
  createContainerSet,
  getContainers,
  manuallyUpdateContainer,
  removeContainer,
  updateContainer,
} = require('../controllers/containerController');

// this route is called by the containers' data server
containerRouter.post('/', createContainerSet); //brewery.displayDefaultBeerContainers )
// this just displays all the available containers currently on delivery
containerRouter.get('/', getContainers);
// this is the route to use when start of the trip would depend on the sensor link
// containerRouter.post('/containers', brewery.displayBeerContainers )
containerRouter.delete('/', clearContainer);

// this route updates a container's temperature
// if temperature is in the request body, the container's temperature is updated to that value
containerRouter.param(
  'containerId',
  (request, _response, next, containerId) => {
    request.containerId = containerId;
    return next();
  }
);
containerRouter.put('/:containerId/input', manuallyUpdateContainer);
containerRouter.put('/:containerId', updateContainer);
containerRouter.delete('/:containerId', removeContainer);

module.exports = containerRouter;
