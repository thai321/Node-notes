const homeRoutes = require('./home');
const userRoutes = require('./users/user');
const cartRoutes = require('./carts/cart');

module.exports = app => {
  app.use('/user', userRoutes);
  app.use('/', homeRoutes);
  app.use('/', cartRoutes)
}
