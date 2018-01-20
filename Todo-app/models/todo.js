const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = require('./user');

const Todo = sequelize.define('Todo', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Todo.belongsTo(User);

module.exports = Todo;
