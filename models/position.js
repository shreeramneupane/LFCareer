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

    show: function (id, callback) {
      db("position").where("id", id).first()
      .then(function (response) {
        if (typeof response === 'undefined') {
          throw new Error();
        }
        callback(null, response);
      })
      .catch(function (error) {
        callback(error, null);
      });
    },

    create: function (positionJSON, callback) {
      var position = positionJSON;

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
          callback(error, null);
        });
      })
      .catch(function (error) {
        callback(error, null);
      });
    },

    update: function (id, positionJSON, callback) {

      db('position')
      .returning('id')
      .where('id', id)
      .update(positionJSON)
      .then(function (response) {
        db("position").where("id", response[0]).first()
        .then(function (updatedPosition) {
          callback(null, updatedPosition);
        });
      })
      .catch(function (error) {
        callback(error, null);
      });
    }
  };
})();
