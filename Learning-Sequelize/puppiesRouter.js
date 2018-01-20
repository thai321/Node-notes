const router = require('express').Router();
const puppies = require('./puppies');

module.exports = router;

router.get('/', (req, res, next) => {
  res.send(puppies);
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const query = req.query;
  const puppy = puppies[id];

  const isEmptyQuery = Object.keys(query).length;
  if (!isEmptyQuery) {
    res.send(puppy);
  } else {
    const responses = {};
    Object.keys(query).map(k => (responses[k] = puppy[k]));
    res.send(responses);
  }
});

router.post('/', (req, res, next) => {
  const puppy = req.body;
  puppies.push(puppy);
  // res.redirect('/puppies');
  res.send(puppy);
  // next();
});

router.put('/:id', (req, res, next) => {
  const puppy = puppies[req.params.id];
  Object.assign(puppy, req.body);
  res.send(puppy);
});
