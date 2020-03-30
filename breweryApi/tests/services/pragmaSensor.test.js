const sensor = require('../../src/services/pragmaSensor');
const assert = require('assert');

const mockSensor = require('../__mocks__/mockSensor');

describe('Testing sensor API with a mocked backend', function () {
  it('returns a successful mocked response', function (done) {
    //perform the request to the api which will now be intercepted by nock
    sensor.getCurrentTemperature('1').then((response) => {
      assert(response, mockSensor.mockedResponse);
      done();
    });
  });
});
