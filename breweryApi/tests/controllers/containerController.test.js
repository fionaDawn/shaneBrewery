jest.mock('../../src/services/beerService');
jest.mock('../../src/services/containerService');
jest.mock('../../src/services/pragmaSensor');
const sensor = require('../../src/services/pragmaSensor');
const Beer = require('../../src/services/beerService');
const Container = require('../../src/services/containerService');
const controller = require('../../src/controllers/containerController');
const mockSensor = require('../__mocks__/mockSensor');
const mockData = require('../__mocks__/sampleData');

const beers = mockData.beers;
const containers = mockData.containers;

Beer.get.mockImplementation(() => beers['1']);
Container.clear.mockImplementation(() => {});
Container.create.mockImplementation(() => containers['1']);
Container.get.mockImplementation(() => containers['1']);
Container.update.mockImplementation(() =>
  Object.assign({}, containers['1'], { temperature: 3, tempInRange: false })
);
Container.updateTemperature.mockImplementation(() => containers['1']);
Container.remove.mockImplementation(() => {});
Container.getAll.mockImplementation(() => containers);
sensor.getCurrentTemperature.mockImplementation(() =>
  Promise.resolve(mockSensor.mockedResponse)
);

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

test('should test #createContainerSet', async () => {
  Container.getAll.mockImplementation(() => {
    return {};
  });
  const res = mockResponse();
  const req = {
    body: {
      id: 1,
      info: {
        '1': 1
      }
    }
  };
  await controller.createContainerSet(req, res, null);
  expect(res.json).toBeCalledWith({ data: containers });
});

test('should test #createContainerSet should return error when there is already exisiting container set', async () => {
  Container.getAll.mockImplementation(() => containers);
  const res = mockResponse();
  const req = {
    body: {
      id: 1,
      info: {
        '1': 1
      }
    }
  };
  await controller.createContainerSet(req, res, null);
  expect(res.send).toBeCalledWith({ message: 'There is a trip in progress' });
});

test('should test #createContainerSet should return error when there is no info in request body', async () => {
  Container.getAll.mockImplementation(() => ({}));
  const res = mockResponse();
  const req = {
    body: {
      id: 1
    }
  };
  await controller.createContainerSet(req, res, null);
  expect(res.send).toBeCalledWith({ message: 'Info cannot be empty' });
});

test('should test #createContainerSet but beer id not found', async () => {
  Beer.get.mockImplementation(() => {
    return {};
  });
  const res = mockResponse();
  const req = {
    body: {
      id: 1,
      info: {
        '7': 1
      }
    }
  };
  await controller.createContainerSet(req, res, null);
  expect(res.json).toBeCalledWith({ data: {} });
  Beer.get.mockImplementation(() => beers['1']);
  Container.getAll.mockImplementation(() => containers);
});

test('should test #getContainers', async () => {
  const res = mockResponse();
  await controller.getContainers(null, res, null);
  expect(res.json).toBeCalledWith({ data: containers });
});

test('should test #removeContainer', async () => {
  const req = {
    params: {
      containerId: '1'
    }
  };
  const res = mockResponse();
  await controller.removeContainer(req, res, null);
  expect(res.status).toBeCalledWith(204);
});

test('should test #manuallyUpdateContainer', async () => {
  const req = {
    params: {
      containerId: '1'
    },
    body: {}
  };
  const res = mockResponse();
  await controller.manuallyUpdateContainer(req, res, null);
  expect(res.json).toBeCalledWith({
    data: Object.assign({}, containers['1'], {
      tempInRange: false,
      temperature: 3
    })
  });
});

test('should test #manuallyUpdateContainer and return not found for nonexisting ids', async () => {
  Container.get.mockImplementation(() => {});
  const req = {
    params: {
      containerId: '0'
    },
    body: {}
  };
  const res = mockResponse();
  await controller.manuallyUpdateContainer(req, res, null);
  expect(res.status).toBeCalledWith(404);
});

test('should test #updateContainer and return not found', async () => {
  Container.update.mockImplementation(() =>
    Object.assign({}, containers['1'], {
      temperature: mockSensor.mockedResponse.temperature,
      tempInRange: false
    })
  );
  const req = {
    params: {
      containerId: '0'
    }
  };
  const res = mockResponse();
  await controller.updateContainer(req, res, null);
  expect(res.status).toBeCalledWith(404);
});

test('should test #removeContainer and return not found', async () => {
  const req = {
    params: {
      containerId: '0'
    }
  };
  const res = mockResponse();
  await controller.removeContainer(req, res, null);
  expect(res.status).toBeCalledWith(404);
});

test('should test #updateContainer', async () => {
  // mock get again
  Container.get.mockImplementation(() => containers['1']);
  const req = {
    params: {
      containerId: '1'
    }
  };
  const res = mockResponse();
  await controller.updateContainer(req, res, null);
  // value of temperature should be the same as the mockedResponse. however since Container.update is mocked to 3, it still gets 3 as result
  expect(res.json).toBeCalledWith({
    data: Object.assign({}, containers['1'], {
      tempInRange: false,
      temperature: mockSensor.mockedResponse.temperature
    })
  });
});

test('should test #clearContainer', async () => {
  const res = mockResponse();
  await controller.clearContainer(null, res);
  expect(res.status).toBeCalledWith(204);
});
