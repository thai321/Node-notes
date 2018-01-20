const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/puppies');

const Puppy = db.define(
  'puppy',
  {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    favFood: {
      type: Sequelize.STRING
    }
    // fullName: {
    //   type: Sequelize.VIRTUAL,
    //   get() {
    //     return `${this.getDatavalue('firstName')} ${this.getDatavalue(
    //       'lastName'
    //     )}`;
    //   }
    // }
  },
  {
    getterMethods: {
      fullName() {
        return `${this.firstName} ${this.lastName}`;
      }
    }
  }
);

module.exports = {
  Puppy,
  db
};
