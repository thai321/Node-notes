const express = require('express');
const router = express.Router();

const models = require('../models/');

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

module.exports = router;
