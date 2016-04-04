
;
(function () {
    "use strict";

    var checkit = require('checkit');
    var validation = new checkit(require('../validation/jobValidation'));

    module.exports = {

        validate: function (job) {
            return validation.run(job);
        }
    }
})();
