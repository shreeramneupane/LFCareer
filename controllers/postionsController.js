;(function () {
  "use strict";

  var Position = require('../models/position');
  var HttpStatus = require('http-status-codes');

  exports.Create = function (request, response) {
    var position = request.body.position;

    var positionJSON = {
      title: position.title.trim(),
      description: position.description.trim(),
      specification: position.specification.trim()
    };

    Position.create(positionJSON, function (error, position) {
      if (error) {
        response.status(HttpStatus.BAD_REQUEST).json({error: error})
      }
      response.status(HttpStatus.OK).json(position)
    })
  };
})();
