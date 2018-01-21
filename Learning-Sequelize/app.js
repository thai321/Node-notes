const express = require('express');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const path = require('path');

const db = require('./db');

// Our router
const puppiesRouter = require('./routes/puppies');
const parksRouter = require('./routes/parks');
const locationsRouter = require('./routes/locations');
const foodsRouter = require('./routes/foods');

// instantiate an instance of an press server
const app = express();
const puppies = require('./puppies');

// Middlewares
// logging middleware
app.use(volleyball);

// body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files like images, css, html, etc
// any get request that matches a particular file in the /public folder
// can be found and sent back
// for example - GET request to
// localhost:3000/large.jpg will send back a puppy image
app.use(express.static(path.join(__dirname, '/public')));

// Router to serve up puppies from the server
app.use('/puppies', puppiesRouter);
app.use('/parks', parksRouter);
app.use('/locations', locationsRouter);
app.use('/foods', foodsRouter);

// All routes will eventually hit this by default if response is not send or
// if it doesn't hit a route
app.use('*', (req, res, next) => {
  res.send('This is my default page');
});

const server = app.listen(3000, () => {
  console.log('Listening on port', server.address().port);
  db.sync({ force: false }).then(message => {
    console.log('DB is synced');
  });
});
