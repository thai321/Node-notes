// User body-parser to get POST request for API use

const bodyParser = require('body-parser');

module.exports = app => {
  console.log('bodyParser HERE');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
};
