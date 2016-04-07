;(function () {
  "use strict";

  var utilityService = require('../services/utilityService');
  var positionService = require('../services/positionService');
  var HttpStatus = require('http-status-codes');
  var _ = require('lodash');

  module.exports = {

    index: function (request, response) {
      positionService.list()
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

      positionService.show(id)
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
      positionService.create(position)
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
      positionService.update(id, position)
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
})();
