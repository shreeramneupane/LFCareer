;(function () {
  "use strict";

  var uuid = require('node-uuid');
  var checkit = require('checkit');

  module.exports = {
    addUUID: function (params) {
      params.id = uuid.v1();
    }

  };
})();
