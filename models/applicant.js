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

    create: function (params) {
      return new Promise(function (resolve, reject) {
        repository.create('applicant',params).then(function(data){
          resolve(data);
        })
        .catch(function(err){
          reject(err);
        });
      });
    },

    update: function (id, applicant, callback) {
      return repository.update('applicant', id, applicant);
    }
  };
})();
