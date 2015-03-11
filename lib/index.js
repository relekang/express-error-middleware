var errors = require('./errors');
exports.errors = errors;

exports.NotFoundMiddleware = function(req, res, next) {
  var err = new errors.NotFoundError();
  next(err);
};

exports.ApiErrorsMiddleware = function(err, req, res, next) {
  res
    .status(err.status || 500)
    .json({
      message: err.message,
      error: err.name
    });
};

exports.ErrorsMiddleware = function(err, req, res, next) {
  res.status(err.status || 500);
  res.render(err.template || 'error/' + (err.status || 500), {
    message: err.message,
    error: err
  });
};

exports.CsrfErrorMiddleware = function(err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);
  next(new errors.InvalidCSRFTokenError());
};
