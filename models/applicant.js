;(function () {
  "use strict";

  var db = require('../db');
  var repository = require('./repository.js');

  module.exports = {

    index: function () {
      return repository.list('applicant');
    },

    show: function (id) {
      return repository.show('applicant', id);
    },

    create: function (position) {
      return repository.create('applicant', position);
    },

    update: function (id, applicant, callback) {
      return repository.update('applicant', id, applicant);
    }
  };
})();
