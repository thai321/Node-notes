const express = require('express');
const router = express.Router();
const passport = require('passport');
const csrf = require('csurf');

const { isLoggedIn, notLoggedIn } = require('./services');

// all the routes should be protected by csrf
const csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn, (req, res, next) => {
  console.log(res.locals.session);
  res.render('user/profile');
});

router.get('/logout', isLoggedIn, (req, res, next) => {
  req.logout();
  res.redirect('/');
})

router.use('/', notLoggedIn, (req, res, next) => {
  next();
})

router.get('/signup', (req, res, next) => {
  const messages = req.flash('error');
  res.render('user/signup', { csrfToken: req.csrfToken(), messages, hasErrors: messages.length > 0 });
});

router.post('/signup', passport.authenticate('local.signup',
  {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
  }
));

router.get('/signin', (req, res, next) => {
  const messages = req.flash('error');
  res.render('user/signin', { csrfToken: req.csrfToken(), messages, hasErrors: messages.length > 0 })
});

router.post('/signin', passport.authenticate('local.signin',
  {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
  }
));

module.exports = router;
