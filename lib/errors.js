var util = require('util');

function NotFoundError() {
  this.name = 'NotFoundError';
  this.status = 404;
  this.message = 'We could not find what you where looking for';
}
util.inherits(NotFoundError, Error);
exports.NotFoundError = NotFoundError;

function InvalidCSRFTokenError() {
  this.name = 'InvalidCSRFTokenError';
  this.status = 403;
  this.message = 'Bad csrf-token';
}
util.inherits(InvalidCSRFTokenError, Error);
exports.InvalidCSRFTokenError = InvalidCSRFTokenError;
