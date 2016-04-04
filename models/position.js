;(function () {
  "use strict";

  var db = require('../db');
  var repository = require('./repository.js');

  module.exports = {

    index: function () {
      return repository.list('position');
    },

    show: function (id) {
      return repository.show('position', id);
    },

    create: function (position) {
      return repository.create('position', position);
    },

    update: function (id, position) {
      return repository.update('position', id, position);
    }
  };
})();
