var express = require('express');
var path = require('path');
var fs = require('fs');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var conditionalHelpers = require(__dirname + '/helpers/conditionals.js');

var hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        equal: conditionalHelpers.equalHelper, 
        compare: conditionalHelpers.compareHelper
    },
    defaultLayout: 'main',
    extname: '.hbs'
});


var routes = require(__dirname+'/routes/index');

var app = express();

// view engine setup
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
app.set('views', __dirname + '/views');

var rootPath = __dirname.replace('/src/server/views', '');

//app.use(favicon(rootPath + '/public/img/ibeam.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(rootPath, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
      console.log("error = " + error);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(process.env.PORT, process.env.IP);

//local port
//console.log("app started on port - " + process.env.PORT);
//app.listen(3000);
module.exports = app;
