const util = require('../../src/util/util');
const mockData = require('../__mocks__/sampleData');

const beer = Object.values(mockData.beers)[0];

test('returns true if beer temp is in range', () => {
  expect(util.isBeerTempInRange(beer, 4)).toBe(true);
  expect(util.isBeerTempInRange(beer, 6)).toBe(true);
});

test('returns false if beer temp is NOT in range', () => {
  expect(util.isBeerTempInRange(beer, 3)).toBe(false);
  expect(util.isBeerTempInRange(beer, 7)).toBe(false);
});
