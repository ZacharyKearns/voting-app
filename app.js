var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();
var jwt = require('jsonwebtoken');
var compression = require('compression');

//routes
var users = require('./routes/users');
var polls = require('./routes/polls');

var app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(compression());

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Request-Headers", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

var staticPath = 'public';

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

//middleware that checks if JWT token exists and verifies it if it does exist.
//In all the future routes, this helps to know if the request is authenticated or not.
app.use(function(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['authorization'];
  if (!token) return next();

  token = token.replace('Bearer ', '');


  jwt.verify(token, process.env.JWT_SECRET, function(err, user) {
    if (err) {
      return res.status(401).json({
        success: false,
        message: 'Please log in using a valid username to submit polls'
      });
    } else {
      req.user = user;
      next();
    }
  });

});


app.use('/api/', polls);
app.use('/api/', users);
app.use(express.static(staticPath));
app.use('/', express.static(staticPath));
app.use('/polls/*', express.static(staticPath));
app.use('/new/*', express.static(staticPath));




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.use(function(err, req, res, next) {
  console.error(err.stack);
  console.log(1)
  res.status(500).send('Uh oh! Something broke!');
});


// error handlers
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.dir(err);
  res.status(err.status || 500);
  if (err.status === 500) {
    console.error(err.stack);
    res.json({
      error: 'Internal Server Error'
    });
  } else if (err.status === 404) {
    res.render('error'); //render error page
  } else {
    res.json({
      error: err.message
    })
  }
});


mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/polls');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB connected!');
});



module.exports = app;
