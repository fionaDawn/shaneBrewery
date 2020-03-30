var User = require('../models/user');

const create = (user) => {
  const newUser = new User(user).data;
  User.add(newUser);
  return newUser;
};

const getAll = () => User.getAll();

const remove = (userId) => User.remove(userId);

module.exports = {
  create: create,
  getAll,
  remove,
};
