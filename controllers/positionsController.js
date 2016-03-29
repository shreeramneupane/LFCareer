;(function () {
  "use strict";

  var Position = require('../models/position');
  var HttpStatus = require('http-status-codes');
  var db = require('../db');
  var _ = require('lodash');

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

      position = _(position).omitBy(_.isUndefined).omitBy(_.isNull).omitBy(_.isEmpty).value();

      Position.create(position, function (error, position) {
        if (error) {
          response.status(HttpStatus.BAD_REQUEST).json({error: error})
        }
        response.status(HttpStatus.OK).json(position)
      })
    },

    Update: function (request, response) {
      var id = request.params.id;
      var position = request.body.position;

      position = _(position).omitBy(_.isUndefined).omitBy(_.isNull).omitBy(_.isEmpty).value();

      Position.update(id, position, function (error, position) {
        if (error) {
          response.status(HttpStatus.BAD_REQUEST).json({error: error})
        }
        response.status(HttpStatus.OK).json(position)
      })
    }
  };
})();
