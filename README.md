# express-error-middleware [![Build status](https://ci.frigg.io/badges/relekang/express-error-middleware/)](https://ci.frigg.io/relekang/express-error-middleware/last/) [![Coverage status](https://ci.frigg.io/badges/coverage/relekang/express-error-middleware/)](https://ci.frigg.io/relekang/express-error-middleware/last/)

Simple error handling middleware for express.js

## Install

```bash
$ npm install --save express-error-middleware
```

## Usage

Below is a example of usage. [test/app.js](https://github.com/relekang/express-error-middleware/blob/master/test/app.js) also
have a similar example.

```javascript
var express = require('express');
var errorHandler = require('express-error-middleware');

var app = express()

// define your routes

app.use(errorHandler.NotFoundMiddleware); // if a request is not handled before this a NotFoundError will be sent into next
app.use(errorHandler.ErrorsMiddleware); // this will render an error page based on the error it gets.
```

### NotFoundMiddleware
Creates a NotFoundError and passes it along.

### ErrorsMiddleware
Renders a request based on the error. `error.status` will determine the status code
of the HTTP request in addition to selecting the template. If error.status is not set,
it will default to `500`. The template rendering looks for `error/<status-code>`. Thus,
if jade is the template engine an error with `403` as status code will use `error/403.jade`
as a template.

### ApiErrorsMiddleware
Creates a JSON-response with the error, works similar to ErrorsMiddleware in the way that
`error.status` defines the HTTP status code.

### CsrfErrorMiddleware
Helper for using [csurf](https://github.com/expressjs/csurf). It turns an error from csurf
into something that ErrorsMiddleware and ApiErrorsMiddleware understands.


----------------------

MIT © Rolf Erik Lekang
