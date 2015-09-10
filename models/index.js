'use strict';
var mongoose = require('mongoose');
var config = require('../config.json');
var logger = require('../lib/logger');

/**
 * useful when deploy by docker
 */
var host = process.env.MONGO_PORT_27017_TCP_ADDR ? process.env.MONGO_PORT_27017_TCP_ADDR : 'localhost';

/**
 * connect mongodb
 */
mongoose.connect('mongodb://' + host + '/' + config.mongo.name, function (err) {
    if (err) {
      logger.error('Connect to %s error: ', config.mongo.name, err.message);
    } else {
    	logger.log('Connect to %s success', config.mongo.name);
    }
});

/**
 * import models
 */
require('./test');

/**
 * export models
 */
exports.test = mongoose.model('test');