const Beer = require('../../src/services/beerService');
const mockData = require('../__mocks__/sampleData');
const beers = mockData.beers;

describe('beerService', function () {
  it('get should return the beer with the given id', function () {
    const beer = Object.values(beers)[0];
    expect(Beer.get(beer.id).name).toBe(beer.name);
  });
});
