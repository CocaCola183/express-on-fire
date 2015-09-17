var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer();
var logger = require('../lib/logger');
var Models = require('../models');
var Test = Models.test;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * get form-data for only text-fields
 */
router.post('/form-data-parser', upload.array(), function (req, res, next) {
	res.send(req.body);
});

/**
 * for error handling
 */
router.get('/error-handling', function (req, res, next) {
	// throw new Error('hello world');
	// res.send('Error handling');
  consol.log('error') ;
  res.send('Test for error handling');
});

/**
 * use of session for a special router
 */
var session = require('express-session');
var config = require('../config.json');

router.use('/session', session({ 
  secret: config.session.secret, 
  saveUninitialized: true,
  resave: false,
  cookie: { maxAge: 60000 }
}));

router.get('/session', function (req, res, next) {
  var sess = req.session;
  logger.error('cookie:', req.cookies);
  logger.error('session:', req.session);
  if (sess.views) {
    sess.views++;
    res.setHeader('Content-Type', 'text/html');
    res.write('<p>views: ' + sess.views + '</p>');
    res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>');
    res.end();
  } else {
    sess.views = 1;
    res.end('welcome to the session demo. refresh!');
  }
});


/**
 * use of params collector
 * test url: http://localhost:3000/collector?name=111&pass=222
 * Note: default gather req.body req.params req.query
 */
router.get('/collector', function(req, res, next) {
	res.send(req.params_all);
});


module.exports = router;
