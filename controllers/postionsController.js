;(function () {
  "use strict";

  var PositionService = require('../services/positionService');
  var HttpStatus = require('http-status-codes');

  exports.create = function (request, response) {
    var position = request.body.position;

//    var positionJSON = {
//      title: position.title.trim(),
//      description: position.description.trim(),
//      specification: position.specification.trim()
//    };

    PositionService.create(position, function (err, position) {
      if (err) {
        response.status(HttpStatus.BAD_REQUEST).json({error: err})
      }
      response.status(HttpStatus.OK).json(position)
    })
  };
})();
