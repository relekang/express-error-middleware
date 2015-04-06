var util = require('util');

function TestError() {
  this.name = 'TestError';
  this.message = 'Test Message';
}
util.inherits(TestError, Error);
exports.TestError = TestError;
