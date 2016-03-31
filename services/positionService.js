;
(function () {
  "use strict";

  var checkit = require('checkit');
  var uuid = require('node-uuid');
  var validation = new checkit(require('../validation/positionValidation'));
  var Position = require('../models/position');
  var HttpStatus = require('http-status-codes');

// Create new position
  exports.create = function (position,callback) {
    validation.run(position)
    .then(function () {
      position.id = uuid.v1();

      Position.create(position, function(err) {
        callback(err);
      });
    })
    .catch(function (err) {
      var error = {
        code: HttpStatus.BAD_REQUEST,
        message: {'error': err}
      };
      callback(error);
    });
  };
})();
