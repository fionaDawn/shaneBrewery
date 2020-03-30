const nock = require('nock');

const mockedResponse = { id: '1', temperature: 7 };

//specify the url to be intercepted
nock('https://temperature-sensor-service.herokuapp.com')
  //define the method to be intercepted
  .get('/sensor/1')
  //respond with a OK and the specified JSON response
  .reply(200, mockedResponse);

module.exports = {
  mockedResponse,
};
