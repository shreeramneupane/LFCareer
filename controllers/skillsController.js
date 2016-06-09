"use strict";


var HttpStatus = require('http-status-codes');

var SkillService = require('../services/skillService');

module.exports = {

  search: function (request, response) {
    SkillService.search(request.query)
    .then(function (data) {
      response.status(HttpStatus.OK).json(data);
    })
    .catch(function (err) {
      response.status(err.code || HttpStatus.BAD_REQUEST).json({
        error: {
          message: err.message, code: err.code, type: err.type
        }
      });
    });
  }
};
