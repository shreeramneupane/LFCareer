;(function () {
  "use strict";

  var db = require('../db');
  var repository = require('./repository.js');

  module.exports = {

    index: function () {
      /**
       * return all positions form position table
       */
     return repository.list('position');
    },

    show: function (id, callback) {
      repository.show('position', id, callback);
    },

    create: function (position, callback) {
      repository.create('position', position, callback);
    },

    update: function (id, position, callback) {
      repository.update('position', id, position, callback);
    }
  };
})();
