;
(function () {
    "use strict";

    var db = require('../db');
    var repository = require('./repository.js');
    var Promise = require("bluebird");

    module.exports = {

        list: function () {
            return new Promise(function (resolve, reject) {
                repository.list('jobs').then(function (data) {
                    resolve(data);
                })
                .catch(function (err) {
                    reject(err);
                });
            });
        },

        show: function (id) {
            return new Promise(function (resolve, reject) {
                repository.show('jobs', id).then(function (data) {
                    resolve(data);
                })
                .catch(function (err) {
                    reject(err);
                });
            });
        },

        create: function (job) {
            return new Promise(function (resolve, reject) {
                repository.create('jobs', job).then(function (data) {
                    resolve(data);
                })
                .catch(function (err) {
                    reject(err);
                });
            });
        },

        update: function (id, job) {
            return new Promise(function (resolve, reject) {
                repository.update('jobs', id, job).then(function (data) {
                    resolve(data);
                })
                .catch(function (err) {
                    reject(err);
                });
            });
        }
    };
})();
