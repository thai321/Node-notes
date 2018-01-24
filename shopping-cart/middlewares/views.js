// flash error, and store the session token
const flash = require('connect-flash');

module.exports = app => {
  app.use(flash());

  app.use((req, res, next) => {
    res.locals.loggedIn = req.isAuthenticated();
    next();
  });
};
