module.exports = {
  isLoggedIn,
  notLoggedIn
}

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next();
  res.redirect('/');
}

function notLoggedIn(req, res, next) {
  if(!req.isAuthenticated()) return next();
  res.redirect('/');
}
