// Cookie and session
const cookieParser = require('cookie-parser');
const session = require('express-session');
const constants = require('../config/constants');

module.exports = app => {
  app.use(cookieParser());
  app.use(session({ secret: constants.JWT_SECRET, resave: false, saveUninitialized: false }));
}
