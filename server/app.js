var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morganBody = require('morgan-body')
var bodyParser = require('body-parser')
var logger = require('morgan')

var app = express();

app.use(bodyParser.json())
morganBody(app)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('views', __dirname + '/app/views');
app.set('view engine', 'pug');

// app models
global.Task = Task = require('./app/models/task').init(true)
global.User = User = require('./app/models/user').init(true)

// Sessions should be kept in memory in a Map, not in users table
// User.updateAll({session_token: ''})

// app routes
app.use('/', require('./config/routes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
