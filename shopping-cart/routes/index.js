const homeRoutes = require('./home');
const userRoutes = require('./users/user');

module.exports = app => {
  app.use('/user', userRoutes);
  app.use('/', homeRoutes);
}
