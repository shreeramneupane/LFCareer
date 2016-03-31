;
(function () {
  "use strict";

  var checkit = require('checkit');
  var validation = new checkit(require('../validation/positionValidation'));

  module.exports = {

  validate: function (position) {
    return validation.run(position);
  }
}
})();
