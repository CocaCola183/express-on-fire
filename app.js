var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var http_logger = require('morgan-plus');
// var http_logger = require('/Users/kivipc/.nvm/versions/node/v0.12.7/lib/node_modules/morgan-plus');
var app_logger = require('./lib/logger');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config.json');
var fs = require('fs');
var routes = require('./routes/index');
var session = require('express-session');
var users = require('./routes/users');
var logger = require('./lib/logger');
var multer =require('multer');
var upload = multer();
var params_collector = require('express-param-collector');
var validator = require('validator-json');
var validator_schema = require('./validator.config.json');

var app = express();

/*set env*/
app.set('env', 'development');

/*view engine setup*/
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

/*uncomment after placing your favicon in /public*/
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// http log
/*for production*/
if(app.get('env') === 'development') {
  var morgan_format_string = http_logger.compile(':method :url :status :response-time ms - :res[content-length]');
  app.use(http_logger(morgan_format_string, {}, __dirname + '/' + config.log.http_log.log_dir));
} else {
  app.use(http_logger('combined', {}, __dirname + '/' + config.log.http_log.log_dir));
}
/*for development*/
app.use(http_logger('dev'));

/*body parser*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*cookie*/
// write cookie object parsed into req.cookies
app.use(cookieParser());

// static folder
app.use(express.static(path.join(__dirname, 'public')));

/*params collector*/
// note just above the router!
app.use(params_collector());

/*validate req params*/
// Note: based on params collector
app.use(function(req, res, next) {
  var validate_errors = validator(req.params_all, validator_schema.req[req.path]);
  if (validate_errors.length) {
    res.status(400);
    next(validate_errors);
  } else next();
});

/*validate res params*/
// Note: only validate for 
app.use(function(req, res, next) {
  var _send = res.send;
  var schema_origin = validator_schema.res[req.path];
  res.send = function() {
    var body = arguments[0];
    var validate_errors = validator(body, schema_origin);
    return _send.apply(res, arguments);
  }
  next();
});

// router
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({status: 'error', message: err});
  });
}

// production error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  // res.send({status: 'error', message: 'Internal server error'});
});

module.exports = app;