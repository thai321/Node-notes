const express = require('express');
const router = express.Router();

const models = require('../../models');
const { generateArray } = require('./helper');

// Node turn req.session.cart from Cart model to dataValues of cart

// And action to add item to the cart
router.get('/add-to-cart/:id', (req, res, next) => {
  const productId = req.params.id;
  console.log('ADD to car', productId);
  const cart = req.session.cart
    ? models.Cart.build(req.session.cart)
    : models.Cart.build();

  models.Product.findById(productId)
    .then(product => {
      cart.add(product, product.id);
      req.session.cart = cart;
      res.redirect('/');
    })
    .catch(err => {
      throw err;
    });
}); // END router.get('/add-to-cart/:id', (req, res, next)

router.get('/reduce/:id', (req, res, next) => {
  const productId = req.params.id;
  const cart = models.Cart.build(req.session.cart);
  const { price } = cart.products[productId];

  cart.reduceByOne(price, productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
}); // END router.get('/reduce/:id', (req, res, next) => {

router.get('/remove/:id', (req, res, next) => {
  const productId = req.params.id;
  const cart = models.Cart.build(req.session.cart);

  cart.remove(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
});

// Render the overview of the shopping list (cart view)
router.get('/shopping-cart', (req, res, next) => {
  console.log('HELLOOIJ');
  if (!req.session.cart) {
    console.log('HEREIRJEIJ');
    return res.render('shop/shopping-cart', { products: null, hello: 'hello' });
  }

  console.log('Body ==== ', req.body);

  const { cart: { items, products, totalPrice, totalQuantity } } = req.session;
  const productsWithItems = generateArray(products, items);
  res.render('shop/shopping-cart', {
    products: productsWithItems,
    totalPrice,
    totalQuantity
  });
}); // END router.get('/shopping-cart', (req, res, next)

module.exports = router;
