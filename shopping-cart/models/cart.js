'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cart = sequelize.define('Cart', {
    items: {
      type: DataTypes.JSON,
      defaultValue: {}
    },
    totalQuantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0
    },
    products: {
      type: DataTypes.VIRTUAL,
      defaultValue: {}
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Cart.prototype.add = function(product, id) {
    let storedItem = this.items[id];
    if(!storedItem) {
      storedItem = this.items[id] = { qty: 0, price: 0 };
      this.products[id] = product.dataValues;
    }

    storedItem.qty++;
    storedItem.price = product.price * storedItem.qty;
    this.totalQuantity++;
    this.totalPrice += product.price;
    return this
  }
  return Cart;
};
