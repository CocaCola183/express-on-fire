var test = require('test-on-fire');
var AvailabilityTest = test.AvailabilityTest;
var schema = JSON.parse(require('fs').readFileSync('./validator.config.json', {encoding: 'utf8'}));
var test = new AvailabilityTest(schema, {urlPrefix: 'http://localhost:3000'});
test.run();