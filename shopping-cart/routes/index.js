const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const passport = require('passport');

const models = require('../models/');
const csrfProtection = csrf();

// all the routes should be protected by csrf
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Product.findAll({}).then(products => {

    const productChunks = [];
    const chunkSize = 3;
    for(let i = 0; i < products.length; i+= chunkSize) {
      productChunks.push(products.slice(i, i + chunkSize));
    }

    res.render('shop/index', { title: 'Shopping Cart', products: productChunks});
  });
});

router.get('/user/signup', (req, res, next) => {
  const messages = req.flash('error');
  res.render('user/signup', { csrfToken: req.csrfToken(), messages, hasErrors: messages.length > 0 });
});

router.post('/user/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

router.get('/user/profile', (req, res, next) => {
  res.render('user/profile');
});

router.get('/user/signin', (req, res, next) => {
  const messages = req.flash('error');
  res.render('user/signin', { csrfToken: req.csrfToken(), messages, hasErrors: messages.length > 0 })
});

router.post('/user/signin', passport.authenticate('local.signin', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}));

module.exports = router;
