import ShaneBrewery from '../../src/api/ShaneBrewery';
import _Mock from '../../mocks/mock.config';

describe('Delivery', function () {
  const success = function (done, promise) {
    promise
      .then((resp) => {
        expect(resp.status).toEqual(204);
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

  const breweryApiUrl = `${global.BASE_API_CONTAINER_URL}/breweryApi`;
  const myContainer = new ShaneBrewery(breweryApiUrl).container;

  describe('constructor', function () {
    it('should store the Base URL', function () {
      expect(myContainer.baseUrl).toEqual(breweryApiUrl);
      expect(myContainer.endpoint).toEqual('/containers');
    });
    it('should store the Base URL and cannot override endpoint', function () {
      const otherContainer = new ShaneBrewery().container;
      expect(otherContainer.baseUrl).toEqual(global.BASE_API_URL);
      expect(otherContainer.endpoint).toEqual('/containers');
    });
  });

  describe('delete()', function () {
    it('should return success on delete', async function (done) {
      success(done, myContainer.delete('1'));
    });
  });
});
