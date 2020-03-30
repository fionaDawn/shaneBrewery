import Pragmabrewery from '../../src/api/Pragmabrewery';
import _Mock from '../../mocks/mock.config';

describe('Pragmabrewery conctructor', () => {
  const defaultUrl = new Pragmabrewery();
  const url = global.BASE_API_CONTAINER_URL;
  const customUrl = new Pragmabrewery(url);

  it('should have a default URL', function () {
    expect(defaultUrl.baseUrl).toEqual(global.BASE_API_URL);
  });
  it('should allow overriding the URL', function () {
    expect(customUrl.baseUrl).toEqual(url);
  });
});
