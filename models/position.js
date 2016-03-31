;
(function () {
  "use strict";

  var db = require('../db');
  var repository = require('./repository.js');

// Create new position
  exports.create = function (position, callback) {
    repository.create('position', position, function (err) {
      callback(err);
    });
  }
})();
