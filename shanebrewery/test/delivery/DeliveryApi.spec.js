import ShaneBrewery from '../../src/api/ShaneBrewery';
import Mock from '../../mocks/mock.config';

describe('Delivery', function () {
  const success = function (done, promise) {
    promise
      .then((resp) => {
        expect(resp.status).toEqual(201);
        done();
      })
      .catch((err) => {
        console.log(err);
        expect(err).toBeUndefined();
        done();
      });
  };

  const failure = function (done, promise) {
    promise
      .then((resp) => {
        expect(resp).toBeUndefined();
        done();
      })
      .catch((err) => {
        expect(err.response.status).toBe(422);
        done();
      });
  };

  const myDelivery = new ShaneBrewery().delivery;

  describe('constructor', function () {
    it('should store the Base URL', function () {
      expect(myDelivery.baseUrl).toEqual(global.BASE_API_URL);
      expect(myDelivery.endpoint).toEqual('/breweryTrip');
    });
    it('should store the Base URL and cannot override endpoint', function () {
      const otherDeliver = new ShaneBrewery(global.BASE_API_CONTAINER_URL)
        .delivery;
      expect(otherDeliver.baseUrl).toEqual(global.BASE_API_CONTAINER_URL);
      expect(otherDeliver.endpoint).toEqual('/breweryTrip');
    });
  });

  describe('start', function () {
    it('should return error when input info is blank', function (done) {
      failure(done, myDelivery.start({}));
    });
    it('should start the trip with no errors', async function (done) {
      success(done, myDelivery.start(Mock.sampleData.deliveryInfo));
    });
    it('should return error when there is ongoing trip', async function (done) {
      failure(done, myDelivery.start(Mock.sampleData.deliveryInfoDup));
    });
  });

  describe('delete()', function () {
    it('should return success on delete', async function (done) {
      success(done, myDelivery.delete());
    });
  });
});
