const router = require('express').Router();

const Food = require('../models/Food');
const Puppy = require('../models/Puppy');

module.exports = router;

// find all foods
router.get('/', (req, res, next) => {
  Food.findAll()
    .then(foods => res.send(foods))
    .catch(next);
});

// post a new food
router.post('/', (req, res, next) => {
  Food.findOrCreate({ where: req.body })
    .then(food => res.send(food))
    .catch(next);
});

// get food by id
router.get('/:id', (req, res, next) => {
  Food.findById(req.params.id, {
    include: [{ model: Puppy, as: 'puppies' }]
  })
    .then(res.send.bind(res))
    .catch(next);
});
