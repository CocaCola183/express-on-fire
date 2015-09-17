var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send({status: 'success'});
});

router.post('/', function(req, res, next) {
	res.send({status: 'success'});
});

router.put('/', function(req, res, next) {
	res.send({status: 'success'});
});

router.delete('/', function(req, res, next) {
	res.send({status: 'success'});
});

module.exports = router;