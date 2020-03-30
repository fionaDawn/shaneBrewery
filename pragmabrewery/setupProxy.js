const proxy = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    proxy('/breweryApi', {
      target: 'http://breweryapi:3000',
      changeOrigin: true
    })
  ),
    app.use(
      proxy('/breweryTrip', {
        target: 'http://thermometersensor:5000',
        changeOrigin: true
      })
    );
};
