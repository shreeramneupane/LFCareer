;
(function () {
  "use strict";

  var checkit = require('checkit');
  var validation = new checkit(require('../validation/applicantValidation'));

  module.exports = {
    validate: function (applicant) {
      return validation.run(applicant);
    }
  }
})();
