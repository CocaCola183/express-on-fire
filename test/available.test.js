var validator_schema = require('../validator.config.json');
var validator = require('validator-json');
var should = require('should');
var request = require('superagent');
var async = require('async');
var vi = require('vi-mock');

var url_prefix = 'http://localhost:3000';

async.eachSeries(Object.keys(validator_schema.req), function (method, callback) {

  async.eachSeries(Object.keys(validator_schema.req[method]), function (url, callback) {

		var params = adapt_params (method, vi.object (validator_schema.req[method][url]));

		var original_url = url;
		url = adapt_url(method, url, params);

		describe(method.toUpperCase() + ':' + url, function () {
		  it('validate res schema', function(done) {
		  	var req = request(method, url_prefix + url);
		  	
				adapt_req(method, req, params).end(function(err, res){
						if(err) {
							done(err);
						} 
						if(!res.body.should.have.property('status', 'success')) {
							done(new Error('status code is not success'));
						} 
						var error_info = validator(res.body, validator_schema.res[method][original_url]);
						if(!error_info.should.be.eql([])) {
							done(new Error('res.body is not expected'));
						} 
						done();
					});
		  });
	  });

		callback();
	}, callback);

}, function(err) {
	if(err) {
		console.error(err);
	}
});

/**
 * params adapter for diferent methods
 * @param  {[type]} method [description]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function adapt_params(method, params) {
	if(method.toLowerCase() === 'get') {
		var param_array = [];
		Object.keys(params).forEach(function(key) {
			return param_array.push(key + '=' + params[key]);
		});
		return '?' + param_array.join('&');
	}
	return params;
}

/**
 * url adapter for different methods
 * @param  {[type]} method [description]
 * @param  {[type]} url    [description]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function adapt_url(method, url, params) {
	if(method === 'get') {
		return url+params;
	}
	return url;
}


/**
 * request method adapter for different methods
 * @param  {[type]} method [description]
 * @param  {[type]} req    [description]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
function adapt_req(method, req, params) {
	if(method !== 'get') {
		req = req.send(params);
	}
	return req;
}

