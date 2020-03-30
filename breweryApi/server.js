var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var containerRouter = require('./src/routes/containers');
var eventRouter = require('./src/routes/events');

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/breweryApi/containers', containerRouter);
app.use('/breweryApi/events', eventRouter);

module.exports = app;
