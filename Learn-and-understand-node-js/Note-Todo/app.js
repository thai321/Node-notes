var express = require('express');
var app = express();

require('./config/db');

var setupController = require('./controllers/setupController');
var apiController = require('./controllers/apiController');

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

setupController(app);
apiController(app);
app.listen(port);
