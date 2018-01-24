const express = require('express');
const path = require('path');
const expressHbs = require('express-handlebars');

const middlewares = require('./config/middlewares');
const constants = require('./config/constants');

const routes = require('./routes');

const models = require('./models');

const app = express();

// view engine setup
app.engine('.hbs', expressHbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', 'hbs');

// Middleware
middlewares(app);

// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

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
