var express = require("express"),
  app = express(),
  cors = require("cors"),
  port = process.env.PORT || 5000;
var bodyParser = require("body-parser");
var tripRouter = require("./src/routes/tripRoute");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/breweryTrip", tripRouter);

app.listen(port);

console.log("shaneBrewery TRIP API server listening on: " + port);
