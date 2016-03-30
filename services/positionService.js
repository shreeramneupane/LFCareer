;
(function () {
  "use strict";

  var checkit = require('checkit');
  var uuid = require('node-uuid')
  var validation = new checkit(require('../validation/positionValidation'));
  var Position = require('../models/position');

// Create new position
  exports.create = function (position, callback) {
    validation.run(position)
    .then(function () {
      position.id = uuid.v1();
      Position.create(position, callback)
    })
    .catch(function (error) {
      callback(error, position);
    });
  };
})();
