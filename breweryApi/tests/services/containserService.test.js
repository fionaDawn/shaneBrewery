const Container = require('../../src/services/containerService');
const mockData = require('../__mocks__/sampleData');
const containers = mockData.containers;
const beer = Object.values(mockData.beers)[0];

const mockContainer = Object.values(containers)[0];
let container;
let containerData;

describe('containerService', function () {
  it('create should create new Container', function () {
    container = Container.create(mockContainer);
    expect(container.id).toBe(container.id);
  });
  it("get all containers should have 1 after a container's been created", function () {
    expect(Object.keys(Container.getAll()).length).toBe(1);
  });
  it("updateTemperature should update container's temperature given an id", function () {
    containerData = Container.get(container.id);
    Container.updateTemperature(containerData, beer, 3);
    expect(containerData.data.temperature).toBe(3);
    expect(containerData.data.tempInRange).toBe(false);
    // since we didn't set containers yet, getAll containers should still return the previous temperature
    const wrongNewList = Container.getAll()[container.id];
    expect(wrongNewList.temperature).toBe(5);
    expect(wrongNewList.tempInRange).toBe(true);
  });
  it('update should update the container on the container list', function () {
    const correctNewList = Container.update(containerData)[container.id];
    expect(correctNewList.temperature).toBe(3);
    expect(correctNewList.tempInRange).toBe(false);
  });
  it('creating another container will automatically add it to container list', function () {
    expect(Container.create(container).beerId).toBe(container.beerId);
    expect(Object.keys(Container.getAll()).length).toBe(2);
  });
  it('remove should remove container given an id', function () {
    expect(Container.remove(container.id)).toBe(Container.getAll());
    expect(Container.getAll()[container.id]).toBeUndefined();
    expect(Object.keys(Container.getAll()).length).toBe(1);
  });
  it('clear should clear all contents of container', function () {
    expect(Object.keys(Container.clear()).length).toBe(0);
  });
});
