const express = require('express');
const path = require('path');


const middlewares = require('./middlewares');
const constants = require('./config/constants');
const allRoutes = require('./routes');
const models = require('./models');

const app = express();

// Middleware
middlewares(app);

// All routes in routes folder
allRoutes(app);

const server = app.listen(constants.PORT, (err) => {
  if(err) {
    throw err;
  }

  console.log('Listening on port:', constants.PORT);
  console.log(`Enviroment: ${process.env.NODE_ENV}`);

  models.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine')
  })
  .catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
  });

})

module.exports = app;
