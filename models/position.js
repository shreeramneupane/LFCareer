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
    .catch(function () {
      var err = "Could not creat a new Position";
      callback(err, position);
    });
  };
})();
