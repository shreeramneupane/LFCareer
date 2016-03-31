;(function () {
  "use strict";

  var Position = require('../services/positionService');
  var HttpStatus = require('http-status-codes');

  module.exports = {

    index: function (request, response) {
      Position.index(function (err, positions) {
        if (err) {
          response.status(HttpStatus.BAD_REQUEST).json({error: err})
        }
        response.status(HttpStatus.OK).json(positions)
      })
    },

    show: function (request, response) {
      var id = request.params.id;

      Position.show(id, function (err, position) {
        if (err) {
          response.status(HttpStatus.BAD_REQUEST).json({error: err})
        }
        response.status(HttpStatus.OK).json(position)
      })
    },

    create: function (request, response) {
      var position = request.body;

      Position.create(position, function (err, position) {
        if (err) {
          response.status(HttpStatus.BAD_REQUEST).json({error: err})
        }
        response.status(HttpStatus.OK).json(position)
      })
    },

    update: function (request, response) {
      var id = request.params.id;
      var position = request.body;

      Position.update(id, position, function (err, position) {
        if (err) {
          response.status(HttpStatus.BAD_REQUEST).json({error: err})
        }
        response.status(HttpStatus.OK).json(position)
      })
    }
  };
})();
