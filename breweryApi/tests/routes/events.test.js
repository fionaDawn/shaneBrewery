const { getEventHandler } = require('../../src/controllers/eventController');

const getSpy = jest.fn();

jest.doMock('express', () => {
  return {
    Router() {
      return {
        get: getSpy,
      };
    },
  };
});

describe('should test router', () => {
  require('../../src/routes/events');
  test('should test get containers', () => {
    expect(getSpy).toHaveBeenCalledWith('/', getEventHandler);
  });
});
