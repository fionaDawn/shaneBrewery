const User = require('../../src/services/userService');
const mockData = require('../__mocks__/sampleData');
const users = mockData.users;

describe('userService', function () {
  it('create should create new User', function () {
    const added = User.create(users[0]);
    expect(added.id).toBe(users[0].id);
  });
  it("get Users should have 1 after a user's been created", function () {
    expect(User.getAll()).toHaveLength(1);
  });
  it('remove should remove user given an id', function () {
    expect(User.remove(users[0].id)).toHaveLength(0);
  });
});
