var schemas = require('./schemas.js');
var _ = require('lodash');
let users = [];

const User = function (data) {
  this.data = data;
};

User.prototype.data = {};

User.add = (user) => users.push(user);

User.remove = (userId) => users.filter((c) => c.id !== userId);

User.getAll = () => users;

module.exports = User;
