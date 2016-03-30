;
(function () {
  "use strict";

  var checkit = require('checkit');
  var validation = new checkit(require('../validation/positionValidation'));
  var Position = require('../models/position');
  var _ = require('lodash');

  module.exports = {

    index: function(callback) {
      Position.index(callback);
    },

    show: function(id, callback) {
      Position.show(id, callback);
    },

    create: function (position, callback) {
      var position = _(position).omitBy(_.isUndefined).omitBy(_.isNull).omitBy(_.isEmpty).value();

      validation.run(position)
      .then(function () {
        Position.create(position, callback)
      })
      .catch(function (err) {
        callback(err, null);
      });
    },

    update: function(id, position, callback) {
      var position = _(position).omitBy(_.isUndefined).omitBy(_.isNull).omitBy(_.isEmpty).value();

      validation.run(position)
      .then(function () {
        Position.update(id, position, callback)
      })
      .catch(function (err) {
        callback(err, null);
      });
    }
  }
})();
