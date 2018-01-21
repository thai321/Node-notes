const router = require('express').Router();

const Location = require('../models/Location');

module.exports = router;

// get a location
router.get('/', (req, res, next) => {
  Location.findAll()
    .then(locations => res.send(locations))
    .catch(next);
});

// post a new location
router.post('/', (req, res, next) => {
  Location.findOrCreate({
    where: req.body
  })
    .then(location => res.send(location))
    .catch(next);
});

// get location by id
router.get('/:id', (req, res, next) => {
  Location.findById(req.params.id)
    .then(location => res.send(location))
    .catch(next);
});
