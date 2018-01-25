const express = require('express');
const router = express.Router();

const models = require('../../models');

const { stripePublishableKey, stripeSecretKey } = require('../../config/keys_dev')

router.get('/checkout', (req, res, next) => {
  if(!req.session.cart) return res.redirect('/shopping-cart');

  const errMsg = req.flash('error')[0];
  const { totalPrice } = req.session.cart;
  res.render('shop/checkout',
    {
      totalPrice,
      errMsg,
      noError: !errMsg,
      stripePublishableKey
    }
  );
});

router.post('/checkout', (req, res, next) => {
  if(!req.session.cart) return res.redirect('/shopping-cart');

  const { totalPrice } = req.session.cart;

  const stripe = require("stripe")(stripeSecretKey);

  stripe.charges.create({
    amount: totalPrice * 100,
    currency: "usd",
    source: req.body.stripeToken, // obtained with Stripe.js
    description: "Testing charge",
  }, (err, charge) => {
    // asynchronously called
    if(err) {
      req.flash('error', err.message);
      return res.redirect('/checkout');
    }

    req.flash('success', 'Successfully bought product!');
    req.session.cart = null;
    res.redirect('/');
  });

})

module.exports = router;
