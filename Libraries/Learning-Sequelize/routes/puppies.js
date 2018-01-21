const router = require('express').Router();

const Puppy = require('../models/Puppy');

module.exports = router;

router.param('id', (req, res, next, id) => {
  Puppy.findById(id)
    .then(puppy => {
      if (!puppy) res.sendStatus(404);
      else {
        req.puppy = puppy;
        next();
      }
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  // res.send(puppies);
  Puppy.findAll({
    where: req.query,
    include: [{ all: true }]
  })
    .then(puppies => res.send(puppies)) // .then(res.send.bind(res))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  res.send(req.puppy);
});
router.post('/', (req, res, next) => {
  Puppy.create(req.body).then(puppy => res.send(puppy));
});

// We will get a foodId in the req.body
router.put('/:id/food', (req, res, next) => {
  req.puppy
    .addFavFoods(req.body.foodId)
    .then(res.send.bind(res))
    .catch(next);
});

// Create a new favorite food that Puppy loves
router.post('/:id/food', (req, res, next) => {
  req.puppy
    .createFavFood(req.body)
    .then(res.send.bind(res))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Puppy.update(req.body, {
    where: {
      id: req.params.id
    },
    // must use returning option to actually get the updated instances back from the db
    returning: true
  })
    .then(whateverUpdateReturns => {
      console.log(whateverUpdateReturns);
      return whateverUpdateReturns[1][0];
    })
    .then(theAcutalUpdatedPuppy => res.send(theAcutalUpdatedPuppy))
    .catch(next);
});
