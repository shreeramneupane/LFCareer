;(function () {
  "use strict";

  var PositionService = require('../services/positionService');
  var HttpStatus = require('http-status-codes');

  exports.create = function (request, response) {
    var position = request.body;

    PositionService.create(position, function (err) {
      if (err) {
        response.status(err.code).json(err.message);
        return;
      }
      response.status(HttpStatus.OK).json(position);
    })
  };
})();
