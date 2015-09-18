var errors = require('./errors');
exports.errors = errors;

exports.NotFoundMiddleware = function(req, res, next) {
  var err = new errors.NotFoundError();
  next(err);
};

exports.ApiErrorsMiddleware = function(err, req, res, next) {
  var payload = {};
  var _payload = {
    message: err.message,
    error: err.name,
    code: err.code
  };

  if (process.env.API_ERROR_WRAPPER) {
    payload[process.env.API_ERROR_WRAPPER] = _payload;
  } else {
    payload = _payload;
  }

  res
    .status(err.status || 500)
    .json(payload);
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
