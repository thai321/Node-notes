'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product = sequelize.define('Product', {
    imagePath: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    price: {
      allowNull: false,
      type: DataTypes.FLOAT
    }
  }, {
    timestamps: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Product;
};
