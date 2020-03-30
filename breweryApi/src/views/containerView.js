var User = require('../services/userService');

const emptyResponse = (res, containers) => {
  sendEventsToAll(res, containers);
  res.status(204).send('Success');
};

const invalidRequest = (res, message) => {
  res.status(422).send({ message });
};

const notFound = (res) => {
  res.status(404).send('Not found');
};

const sendEvent = (res, containers) => {
  res.write(`data: ${JSON.stringify(containers)}\n\n`);
  res.flushHeaders();
};

// Iterate clients list and use write res object method to send new nest
const sendEventsToAll = (res, containers) => {
  User.getAll().forEach((c) => {
    c.res.write(`data: ${JSON.stringify(containers)}\n\n`);
    c.res.flushHeaders();
  });
  successResponse(res, containers);
};

const successResponse = (res, containers) => {
  res.json({ data: containers });
};

module.exports = {
  emptyResponse: emptyResponse,
  invalidRequest: invalidRequest,
  notFound: notFound,
  sendEvent: sendEvent,
  sendEventsToAll: sendEventsToAll,
  successResponse: successResponse
};
