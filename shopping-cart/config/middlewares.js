const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const volleyball = require('volleyball');
const path = require('path');
const favicon = require('serve-favicon');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

const constants = require('./constants');

const isDev = process.env.NODE_ENV === 'development';

module.exports = (app) => {

  // User body-parser to get POST request for API use
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use(session({ secret: constants.JWT_SECRET, resave: false, saveUninitialized: false }));
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
  require('./passport');
  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


  // Logger middleware in development enviroment
  if(isDev) {
    const morgan = require('morgan');
    const volleyball = require('volleyball');
    // Log request to console
    app.use(morgan('dev'));
    app.use(volleyball);
  }
}
