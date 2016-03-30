;
(function () {
  "use strict";

  var db = require('../db');

  module.exports = {

    index: function (callback) {
      db("position").select()
      .then(function (response) {
        callback(null, response);
      })
      .catch(function (err) {
        err = "'Can not fetch positions'";
        callback(err, null);
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
      .catch(function (err) {
        err = 'Can not fetch position with id: ' + id;
        callback(err, null);
      });
    },

    create: function (position, callback) {
      db('position')
      .insert(position)
      .then(function (response) {
        callback(null, position);
      })
      .catch(function (err) {
        callback(err, position);
      })
    },

    update: function (id, position, callback) {
      db('position')
      .returning('id')
      .where('id', id)
      .update(position)
      .then(function (response) {
        db("position").where("id", response[0]).first()
        .then(function (updatedPosition) {
          callback(null, updatedPosition);
        });
      })
      .catch(function (err) {
        callback(err, null);
      });
    }
  };
})();
