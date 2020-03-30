const {
  clearContainer,
  createContainerSet,
  manuallyUpdateContainer,
  getContainers,
  removeContainer,
  updateContainer,
} = require('../../src/controllers/containerController');

const getSpy = jest.fn();
const postSpy = jest.fn();
const paramSpy = jest.fn();
const putSpy = jest.fn();
const deleteSpy = jest.fn();

jest.doMock('express', () => {
  return {
    Router() {
      return {
        get: getSpy,
        post: postSpy,
        param: paramSpy,
        put: putSpy,
        delete: deleteSpy,
      };
    },
  };
});

describe('should test router', () => {
  require('../../src/routes/containers');
  test('should test post containers', () => {
    expect(postSpy).toHaveBeenCalledWith('/', createContainerSet);
  });
  test('should test get containers', () => {
    expect(getSpy).toHaveBeenCalledWith('/', getContainers);
  });
  test('should test clear containers', () => {
    expect(deleteSpy).toHaveBeenCalledWith('/', clearContainer);
  });
  test('should test containers containerId param', () => {
    expect(paramSpy).toHaveBeenCalledWith('containerId', expect.any(Function));
  });
  test('should test put containers on manualupdate', () => {
    expect(putSpy).toHaveBeenCalledWith(
      '/:containerId/input',
      manuallyUpdateContainer
    );
  });
  test('should test put containers', () => {
    expect(putSpy).toHaveBeenCalledWith('/:containerId', updateContainer);
  });
  test('should test delete containers', () => {
    expect(deleteSpy).toHaveBeenCalledWith('/:containerId', removeContainer);
  });
});
