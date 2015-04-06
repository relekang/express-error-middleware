var expect = require('chai').expect;
var Bluebird = require('bluebird');
var request = Bluebird.promisifyAll(require('supertest'));
var app = require('./app.js');

describe('express-error-middleware', function() {
  describe('NotFoundMiddleware', function() {
    it('should make express return 404', function() {
      return request(app)
        .get('/page-that-does-not-exist')
        .expect(404)
        .endAsync()
        .then(function(res) {
          expect(res.text).to.contain('NotFoundError');
        });
    });
  });
  describe('ApiErrorsMiddleware', function() {
    it('should return error as json', function() {
      return request(app)
        .get('/api/')
        .expect(500)
        .endAsync()
        .then(function(res) {
          expect(res.body.error).to.equal('TestError');
          expect(res.body.message).to.equal('Test Message');
        });
    });
  });
  describe('ErrorsMiddleware', function() {
    it('should return error template', function() {
      return request(app)
        .get('/')
        .expect(500)
        .endAsync()
        .then(function(res) {
          expect(res.text).to.contain('an error you say?');
        });
    });

    it('should return custom error template', function() {
      return request(app)
        .get('/401')
        .expect(401)
        .endAsync()
        .then(function(res) {
          expect(res.text).to.contain('Access denied');
          expect(res.text).to.contain('Sorry');
        });
    });
  });
});
