import ShaneBrewery from '../../src/api/ShaneBrewery';
import _Mock from '../../mocks/mock.config';

describe('ShaneBrewery conctructor', () => {
  const defaultUrl = new ShaneBrewery();
  const url = global.BASE_API_CONTAINER_URL;
  const customUrl = new ShaneBrewery(url);

  it('should have a default URL', function () {
    expect(defaultUrl.baseUrl).toEqual(global.BASE_API_URL);
  });
  it('should allow overriding the URL', function () {
    expect(customUrl.baseUrl).toEqual(url);
  });
});
