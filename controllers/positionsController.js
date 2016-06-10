"use strict";

var HttpStatus = require('http-status-codes');

var PositionService = require('../services/positionService');

module.exports = {

  index: function (request, response) {
    PositionService.list()
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
  },

  show: function (request, response) {
    var id = request.params.id;

    PositionService.show(id)
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
  },

  create: function (request, response) {
    var position = request.body;
    PositionService.create(position)
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
  },

  update: function (request, response) {
    var id = request.params.id;
    var position = request.body;
    PositionService.update(id, position)
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
