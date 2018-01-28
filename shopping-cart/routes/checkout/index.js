const express = require('express');
const models = require('../../models');
const accounting = require('accounting-js');

const pry = require('pryjs');

const { requireSignin } = require('./service');
const {
  stripePublishableKey,
  stripeSecretKey,
  twilioAccountSID,
  twilioAuthToken
} = require('../../config/keys_dev');

const router = express.Router();
const client = require('twilio')(twilioAccountSID, twilioAuthToken);

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
  // eval(pry.it);

  if (!req.session.cart) return res.redirect('/shopping-cart');

  const { id, name, phone, email } = req.user;
  const { totalPrice } = req.session.cart;
  const stripe = require('stripe')(stripeSecretKey);

  stripe.charges.create(
    {
      amount: totalPrice * 100,
      currency: 'usd',
      source: req.body.stripeToken, // obtained with Stripe.js
      description: 'Testing charge',
      metadata: {
        userName: name,
        email
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
        userId: id
      };

      models.Order.create(orderData)
        .then(order => {
          const cartData = Object.assign({}, req.session.cart);
          cartData.order = order.dataValues;
          cartData.userId = id;
          cartData.orderId = order.id;

          models.Cart.create(cartData)
            .then(cart => {
              req.flash('success', 'Successfully bought product!');
              req.session.cart = null;

              const moneyFormat = accounting.format(
                eval(charge.amount / 100),
                2
              );
              if (phone) {
                client.messages
                  .create({
                    to: `+1${phone}`,
                    from: '+18312467082',
                    body: `TESTING: Thank you for the order of ${moneyFormat}`
                  })
                  .then(message => {
                    console.log(message);
                    res.redirect('/');
                  });
              } else {
                res.redirect('/');
              }
            }) // END .then(cart => {
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
