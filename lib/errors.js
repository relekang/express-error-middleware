var util = require('util');

function NotFoundError() {
  this.status = 404;
}
util.inherits(NotFoundError, Error);
exports.NotFoundError = NotFoundError;
