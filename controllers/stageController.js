;
(function () {
  "use strict";

  var utilityService = require('../services/utilityService');
  var stageService = require('../services/stageService');
  var HttpStatus = require('http-status-codes');
  var _ = require('lodash');

  module.exports = {

    index: function (request, response) {
      stageService.list()
      .then(function (data) {
        response.status(HttpStatus.OK).json(data);
      })
      .catch(function (err) {
        response.status(err.code || HttpStatus.BAD_REQUEST).json({error: {
          message: err.message, code: err.code, type: err.type
        }});
      });
    },

    show: function (request, response) {
      var id = request.params.id;

      stageService.show(id)
      .then(function (data) {
        response.status(HttpStatus.OK).json(data);
      })
      .catch(function (err) {
        response.status(err.code || HttpStatus.BAD_REQUEST).json({error: {
          message: err.message, code: err.code, type: err.type
        }});
      });
    },

    create: function (request, response) {
      var stage = request.body;
      stageService.create(stage)
      .then(function (data) {
        response.status(HttpStatus.OK).json(data);
      })
      .catch(function (err) {
        response.status(err.code || HttpStatus.BAD_REQUEST).json({error: {
          message: err.message, code: err.code, type: err.type
        }});
      });
    },

    update: function (request, response) {
      var id = request.params.id;
      var stage = request.body;
      stageService.update(id, stage)
      .then(function (data) {
        response.status(HttpStatus.OK).json(data);
      })
      .catch(function (err) {
        response.status(err.code || HttpStatus.BAD_REQUEST).json({error: {
          message: err.message, code: err.code, type: err.type
        }});
      });
    }
  };
})();
