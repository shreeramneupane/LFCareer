;(function () {
    "use strict";

    var db = require('../db');
    var repository = require('./repository.js');

    module.exports = {

        index: function () {
            return repository.list('job');
        },

        show: function (id) {
            return repository.show('job', id);
        },

        create: function (job) {
            return repository.create('job', job);
        },

        update: function (id, job) {
            return repository.update('job', id, job);
        }
    };
})();
