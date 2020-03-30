var port = process.env.PORT || 3000;
var app = require('./server.js');
app.listen(port);
console.log('pragmaBrewery RESTful API server listening on: ' + port);
