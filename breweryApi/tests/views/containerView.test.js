const view = require('../../src/views/containerView');
const User = require('../../src/services/userService');
const mockData = require('../__mocks__/sampleData');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const res = mockResponse();

test('sendEventsToAll should write to res object for all users', () => {
  User.create(mockData.users[0]);
  const ret = view.sendEventsToAll(res, mockData.containers);
  expect(ret).toBeUndefined();
});
