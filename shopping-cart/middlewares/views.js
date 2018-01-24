// flash error, and store the session token
const flash = require('connect-flash');
const expressHbs = require('express-handlebars');

module.exports = app => {

  // view engine setup
  app.engine('.hbs', expressHbs({ defaultLayout: 'layout', extname: '.hbs' }));
  app.set('view engine', 'hbs');

  app.use(flash());
  app.use((req, res, next) => {
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.session = req.session;
    next();
  });
};
