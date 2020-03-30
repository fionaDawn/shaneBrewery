var express = require('express');
var eventRouter = express.Router();
var { getEventHandler } = require('../controllers/eventController');

// route to subscribe to SSE
eventRouter.get('/', getEventHandler); //brewery.eventHandler );

module.exports = eventRouter;
