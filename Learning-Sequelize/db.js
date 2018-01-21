const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/puppies', {
  logging: false
});

module.exports = db;

// We will define association after we import them here
const Puppy = require('./models/Puppy');
const Food = require('./models/Food');
const Park = require('./models/Park');
const Location = require('./models/Location');

// This will put a foreign key for favParkId in the Puppy model
// and give Puppy .setFavPark() and .getFavPark() instance methods
Puppy.belongsTo(Park);
Park.hasMany(Puppy);

// Puppy - food M:M associations
Puppy.belongsToMany(Food, { as: 'favFoods', through: 'puppiesFoods' });
Food.belongsToMany(Puppy, { as: 'puppies', through: 'puppiesFoods' });

// Puppies can have a best friend Puppy
Puppy.belongsTo(Puppy, { as: 'bestFriend' });

Park.belongsTo(Location);
// give us .setLocation() and .getLocation()
