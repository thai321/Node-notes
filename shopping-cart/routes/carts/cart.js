const express = require('express');
const router = express.Router();

const models = require('../../models');

// Node turn req.session.cart from Cart model to dataValues of cart

router.get('/add-to-cart/:id', (req, res, next) => {
  const productId = req.params.id;

  const cart = req.session.cart ? models.Cart.build(req.session.cart) : models.Cart.build();

  models.Product.findById(productId)
    .then(product => {
      cart.add(product, product.id);
      req.session.cart = cart;
      console.log(cart.dataValues);
      res.redirect('/')
    }).catch(err => {throw(err)});
}); // END router.get('/add-to-cart/:id', (req, res, next)

module.exports = router;
