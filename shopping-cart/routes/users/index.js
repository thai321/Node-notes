const express = require('express');
const router = express.Router();
const passport = require('passport');
const async = require('async');

const models = require('../../models');

const { isLoggedIn, notLoggedIn, getProducts } = require('./service');
const { generateArray } = require('./helper');

// all the routes should be protected by csrf
const csrf = require('csurf');
const csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn, (req, res, next) => {
  const { id } = req.user;
  const result = [];

  console.log('OISDJFOJSDIFJOISDJFIOJSDFIOJDIOFIODFSOIJ');
  req.user
    .getOrders({
      attributes: [
        'id',
        'amount',
        'paymentMethod',
        'description',
        'status',
        'createdAt'
      ],
      include: [{ model: models.Cart }]
    })
    .then(orders => {
      if (orders.length <= 0) {
        console.log('HEROIIJOIJJOIJOJIO');
        res.render('user/profile', { empty: true });
      } else {
        async.each(
          orders,
          getProducts, // service function
          err => {
            if (err) throw err;
            res.render('user/profile', { orders });
          } // END err => {
        ); // END async.each(
      } // END else {
    }); // END .then(orders => {
}); // END router.get('/profile', isLoggedIn, (req, res, next) => {

router.get('/logout', isLoggedIn, (req, res, next) => {
  console.log('LOG OUTOUTOUTOTOUOT');
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
    // console.log('REQ BODY ====== ', req.body);
    console.log('I am sign up now');
    // this funtion will run if sign in success
    if (req.session.oldUrl) {
      const { oldUrl } = req.session;
      req.session.oldUrl = null;
      res.redirect(oldUrl);
    } else {
      console.log(req.session);
      console.log(req.isAuthenticated());
      console.log('Go to /user/profile');

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
    console.log('INDESOIDJFISDJOFSODFDIS  ');

    // this funtion will run if sign in success
    if (req.session.oldUrl) {
      console.log(1);
      const { oldUrl } = req.session;
      req.session.oldUrl = null;
      res.redirect(oldUrl);
    } else {
      console.log(2);
      res.redirect('/user/profile');
    }
  } // END (req, res, next)
); // END router.post(

// // all the routes should be protected by csrf
// const csrfProtection = csrf();
// router.use(csrfProtection);
module.exports = router;
