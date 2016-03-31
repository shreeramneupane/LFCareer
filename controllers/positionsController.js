;(function () {
  "use strict";

  var utilityService = require('../services/utilityService');
  var positionService = require('../services/positionService');
  var HttpStatus = require('http-status-codes');
  var _ = require('lodash');

  module.exports = {

    index: function (request, response) {
      //Handling the promise here
      Position.index()
      .then(function (data) {
        response.status(HttpStatus.OK).json(data);
      })
      .catch(function (err) {
        err = 'Cannot fetch positions';
        response.status(HttpStatus.BAD_REQUEST).json({error: err});
      });
    },

    show: function (request, response) {
      var id = request.params.id;

      Position.show(id)
      .then(function (data) {
        if (typeof data === 'undefined') {
          throw new Error();
        }
        response.status(HttpStatus.OK).json(data);
      })
      .catch(function (err) {
        err = 'Can not fetch position with id: ' + id;
        response.status(HttpStatus.BAD_REQUEST).json({error: err});
      });
    },

    create: function (request, response) {
      var position = request.body;

      position = _(position).omitBy(_.isUndefined).omitBy(_.isNull).omitBy(_.isEmpty).value();

      positionService.validate(position)
      .then(function () {
        utilityService.addUUID(position);

        Position.create(position)
        .then(function (data) {
          response.status(HttpStatus.OK).json(data)
        })
        .catch(function (err) {
          response.status(HttpStatus.BAD_REQUEST).json({error: err});
        });
      });
      //.catch(function (err) {
      //  response.status(HttpStatus.BAD_REQUEST).json({error: err});
      //});
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
