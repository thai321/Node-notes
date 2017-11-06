const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cons = require('consolidate'),
  dust = require('dustjs-helpers'),
  // pg = require('pg'),
  app = express();

const { Pool, Client } = require('pg');
const connectionString = 'postgres://nodeRecipe:123456@localhost/recipebookdb';

const pool = new Pool({
  connectionString: connectionString
});

const client = new Client({
  connectionString: connectionString
});
client.connect();

// DB Connect String
// const conString = 'postgres://nodeRecipe:123456@localhost/recipebookdb';

// Assign Dust Engine To .dust Files
app.engine('dust', cons.dust);

// Set Default Ext .dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(__dirname + '/public'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  pool.connect(function(err, client, done) {
    if (err) {
      return console.log('Error fetching client from pool', err);
    }
    client.query('SELECT * FROM recipes', function(err, result) {
      if (err) {
        return console.error('error running query', err);
      }
      res.render('index', { recipes: result.rows });
      done();

      console.log(result);
    });
  });
});

// Server
app.listen(3000, function() {
  console.log('Server Started On Port 3000');
});
