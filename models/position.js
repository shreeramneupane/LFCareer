;
(function () {
  "use strict";

  var db = require('../db');

// Create new position
  exports.create = function (position, callback) {

    db('position')
    .insert(position)
    .then(function (response) {
      callback(null, position);
    })
    .catch(function (error) {
      callback(error, position);
    });
  };
})();
