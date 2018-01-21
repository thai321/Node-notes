const Sequelize = require('sequelize');
const db = require('../db');

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
      allowNull: false,
      defaultValue: 1
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
      // this refers to instance in getter methods
      fullName() {
        return `${this.firstName} ${this.lastName}`;
      }
    },
    classMethods: {
      // this refers to class in class methods
      findByFavFood(food) {
        return this.findAll({
          where: {
            favFood: food
          }
        });
      },
      count() {
        return this.findAll().then(puppies => puppies.length);
      }
    }
    /*
    hooks: {
      // this refers to the class, but the instance is
      // the first argument of any hook function
      beforeValidate(puppy) {
        puppy.favFood = 'Buffalo chicken pizza';
      }
    }
    */

    // not working
    // this refers to instance
    // instanceMethods: {
    //   greet: function() {
    //     return 'Woof my name is ' + this.fullName;
    //   }
    // }
  }
);

Puppy.prototype.greet = function() {
  return `Woof my name is ${this.fullName}`;
};

module.exports = Puppy;
