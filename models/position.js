;(function () {
  "use strict";

  var checkit = require('checkit');
  var db = require('../db');
  var validation = new checkit(require('./validation/positionValidation'));

  module.exports = {

    index: function (callback) {
      db("position").select()
      .then(function (response) {
        callback(null, response);
      })
      .catch(function (error) {
        callback(error, null);
      });
    },

    create: function (positionJSON, callback) {
      var position = {
        title: positionJSON.title,
        description: positionJSON.description,
        specification: positionJSON.specification
      };

      validation.run(position)
      .then(function () {
        db('position')
        .returning('id')
        .insert(position)
        .then(function (response) {
          position.id = response[0];
          callback(null, position);
        })
        .catch(function (error) {
          callback(error, position);
        });
      })
      .catch(function (error) {
        callback(error, position);
      });
    }
  };
})();
