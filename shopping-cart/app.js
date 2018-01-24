var express = require('express');
var path = require('path');
var expressHbs = require('express-handlebars');


const middlewares = require('./config/middlewares');
const constants = require('./config/constants');

var index = require('./routes/index');

const models = require('./models');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', expressHbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', 'hbs');


middlewares(app);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


const server = app.listen(constants.PORT, (err) => {
  if(err) {
    throw err;
  }

  console.log('Listening on port:', constants.PORT);
  console.log(`Enviroment: ${process.env.NODE_ENV}`);

  models.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine')
  })
  .catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
  });

})

module.exports = app;
