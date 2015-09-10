'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var test_schema = new Schema({
  title: {type: 'String', default: ''},
  author: {type: 'String', default: ''},
  image_url: {type: 'String', default: ''},
  description: {type: 'String', default: ''},
  time: {type: 'String', default: ''},
  source: {type: 'String', default: ''},
  content: {type: 'String', default: ''},
  is_confirmed: {type: 'Boolean', default: false},
  is_delete: {type: 'Boolean', default: true},
  create_at: {type: 'Number', default: Date.now()},
  update_at: {type: 'Number', default: Date.now()}
});

mongoose.model('test', test_schema);