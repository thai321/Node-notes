const express = require('express');
const router = express.Router();

const models = require('../../models');
const { requireSignin } = require('./service');

const {
  stripePublishableKey,
  stripeSecretKey
} = require('../../config/keys_dev');

router.get('/checkout', requireSignin, (req, res, next) => {
  if (!req.session.cart) return res.redirect('/shopping-cart');

  const errMsg = req.flash('error')[0];
  const { totalPrice } = req.session.cart;
  res.render('shop/checkout', {
    totalPrice,
    errMsg,
    noError: !errMsg,
    stripePublishableKey
  }); // END res.render('shop/checkout'
}); // END router.get('/checkout', (req, res, next)

// Charging the customer with Stripe service
router.post('/checkout', requireSignin, (req, res, next) => {
  if (!req.session.cart) return res.redirect('/shopping-cart');

  const { totalPrice } = req.session.cart;
  // console.log(req.session.cart);
  const stripe = require('stripe')(stripeSecretKey);

  stripe.charges.create(
    {
      amount: totalPrice * 100,
      currency: 'usd',
      source: req.body.stripeToken, // obtained with Stripe.js
      description: 'Testing charge',
      metadata: {
        userName: 'Thai'
      }
    },
    (err, charge) => {
      // asynchronously called
      if (err) {
        req.flash('error', err.message);
        return res.redirect('/checkout');
      }

      const orderData = {
        name: charge.metadata.userName,
        email: charge.source.name,
        paymentId: charge.id,
        paymentMethod: charge.source.brand,
        address: charge.source.address_zip,
        amount: charge.amount,
        currency: charge.currency,
        description: charge.description,
        status: charge.status,
        userId: 1
      };

      models.Order.create(orderData)
        .then(order => {
          const cartData = Object.assign({}, req.session.cart);
          cartData.order = order.dataValues;
          cartData.userId = 1;
          cartData.orderId = order.id;

          models.Cart.create(cartData)
            .then(cart => {
              req.flash('success', 'Successfully bought product!');
              req.session.cart = null;
              res.redirect('/');

              // END models.Cart.create(req.session.cart)
            })
            .catch(error => {
              throw error;
            });
          // END models.Order.create(orderData)
        })
        .catch(error => {
          throw error;
        });
    }
  ); // END (err, charge)
}); // END router.post('/checkout', (req, res, next) => {

module.exports = router;
