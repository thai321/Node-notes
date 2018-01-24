const express = require('express');
const router = express.Router();

const models = require('../../models');

router.get('/add-to-cart/:id', (req, res, next) => {
  const productId = req.params.id;

  
});

module.exports = router;
