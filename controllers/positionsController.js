;(function () {
  "use strict";

  var Position = require('../models/position');
  var HttpStatus = require('http-status-codes');

  module.exports = {

    Index: function (request, response) {
      Position.index(function (error, positions) {
        if (error) {
          response.status(HttpStatus.BAD_REQUEST).json({error: 'Can not fetch positions'})
        }
        response.status(HttpStatus.OK).json(positions)
      })
    },

    Show: function (request, response) {
      var id = request.params.id;

      Position.show(id, function (error, position) {
        if (error) {
          response.status(HttpStatus.BAD_REQUEST).json({error: 'Can not fetch position with id: ' + id})
        }
        response.status(HttpStatus.OK).json(position)
      })
    },

    Create: function (request, response) {
      var position = request.body.position;

      var positionJSON = {
        title: position.title,
        description: position.description,
        specification: position.specification
      };

      Position.create(positionJSON, function (error, position) {
        if (error) {
          response.status(HttpStatus.BAD_REQUEST).json({error: error})
        }
        response.status(HttpStatus.OK).json(position)
      })
    }
  };
})();
