'use strict';

var env = process.env.NODE_ENV || 'development';
var HttpStatus = require('http-status-codes');
var request = require('request');
var fileName = "../config/vyagutaConfig.json";

var config = require(fileName)[env];

module.exports = {

  authorize: function (req, res, next) {
    if (req.originalUrl === '/v1/applicants' && req.method === 'POST') {
      next();
    }
    else {
      var authorization = req.get('Authorization');
      var authorizationURL = config['auth_userinfo_url'];

      request({
        url    : authorizationURL,
        method : 'GET',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization': authorization
        }
      }, function (err, response) {
        if (err || response.statusCode !== HttpStatus.OK) {
          res.status(HttpStatus.UNAUTHORIZED)
          .send({
            error: {
              message: response.statusMessage
            }
          });
        }
        else {
          next();
        }
      });
    }
  }
};
