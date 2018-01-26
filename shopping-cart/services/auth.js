module.exports = {
  isLoggedIn,
  notLoggedIn,
  requireSignin
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
}

function requireSignin(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/user/signin');
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) return next();
  res.redirect('/');
}
