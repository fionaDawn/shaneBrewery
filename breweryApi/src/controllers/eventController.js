var { create, remove } = require('../services/userService');
var Container = require('../services/containerService');
var { sendEvent } = require('../views/containerView');

const getEventHandler = (req, res) => {
  // Mandatory headers and http status to keep connection open
  res.writeHead(200, {
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
  });

  // when connection is opened, send current container values
  sendEvent(res, Container.getAll());

  // Generate an id based on timestamp and save res
  // object of client connection on clients list
  // Later we'll iterate it and send updates to each client
  const clientId = Date.now();
  create({
    id: clientId,
    res,
  });

  // When client closes connection we update the clients list
  // avoiding the disconnected one
  req.on('close', () => {
    console.log(`${clientId} Connection closed`);
    remove(clientId);
  });
};

module.exports = {
  getEventHandler: getEventHandler,
};
