const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING
  }
});

module.exports = User;
