jest.mock('../../src/services/userService');
jest.mock('../../src/services/containerService');
const User = require('../../src/services/userService');
const Container = require('../../src/services/containerService');
const controller = require('../../src/controllers/eventController');
const sampleData = require('../__mocks__/sampleData');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  // shoudl this be text?
  res.writeHead = jest.fn().mockReturnValue(res);
  res.write = jest.fn().mockReturnValue(res);
  res.flushHeaders = jest.fn().mockReturnValue(res);
  return res;
};

const res = mockResponse();

const users = sampleData.users;

User.create.mockImplementation(() => users[0]);
User.getAll.mockImplementation(() => users);
User.remove.mockImplementation(() => []);

test('should test #getEventHandler', async (done) => {
  Container.getAll.mockImplementation(() => {
    return {};
  });
  const req = {
    on: jest.fn().mockReturnValue(res),
  };
  await controller.getEventHandler(req, res, null);
  expect(res.write).toBeCalledWith(`data: {}\n\n`);
  done();
});
