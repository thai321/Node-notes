const express = require('express');
const router = express.Router();
const passport = require('passport');
const csrf = require('csurf');

const { isLoggedIn, notLoggedIn } = require('./service');

// all the routes should be protected by csrf
const csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn, (req, res, next) => {
  // console.log(res.locals.session);
  res.render('user/profile');
});

router.get('/logout', isLoggedIn, (req, res, next) => {
  req.logout();
  res.redirect('/');
});

router.use('/', notLoggedIn, (req, res, next) => {
  next();
});

router.get('/signup', (req, res, next) => {
  const messages = req.flash('error');
  res.render('user/signup', {
    csrfToken: req.csrfToken(),
    messages,
    hasErrors: messages.length > 0
  }); // END res.render('user/signup'
}); // END router.get('/signup', (req, res, next)

router.post(
  '/signup',
  passport.authenticate('local.signup', {
    // successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
  }), // END passport.authenticate('local.signup'
  (req, res, next) => {
    // this funtion will run if sign in success
    if (req.session.oldUrl) {
      const { oldUrl } = req.session;
      req.session.oldUrl = null;
      res.redirect(oldUrl);
    } else {
      res.redirect('/user/profile');
    }
  } // END (req, res, next)
); // END router.post(

router.get('/signin', (req, res, next) => {
  const messages = req.flash('error');
  res.render('user/signin', {
    csrfToken: req.csrfToken(),
    messages,
    hasErrors: messages.length > 0
  }); // END res.render('user/signin'
}); // END router.get('/signin', (req, res, next)

router.post(
  '/signin',
  passport.authenticate('local.signin', {
    // successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
  }), // END passport.authenticate('local.signin'
  (req, res, next) => {
    // this funtion will run if sign in success
    if (req.session.oldUrl) {
      const { oldUrl } = req.session;
      req.session.oldUrl = null;
      res.redirect(oldUrl);
    } else {
      res.redirect('/user/profile');
    }
  } // END (req, res, next)
); // END router.post(

module.exports = router;
