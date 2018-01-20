const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./config/db');
const User = require('./models/user');

app.get('/', (req, res) => {
  res.send('Good ramen');
});

app.listen(3000, () => {
  console.log('Starting on port 3000');

  User.sync({ force: true }).then(() => {
    return User.create({
      name: 'Ramen'
    });
  });
});
