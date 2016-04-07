;(function () {
    "use strict";

    var checkit = require('checkit');
    var uuid = require('node-uuid');
    var validation = new checkit(require('../validation/jobValidation'));
    var Job = require('../models/job');
    var _ = require('lodash');
    var Promise = require("bluebird");
    var AppError = require('../error/AppError');

    module.exports = {

        list: function () {
            return new Promise(function (resolve, reject) {
                Job.list()
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (err) {
                    reject(err);
                });
            });
        },

        show: function (id) {
            return new Promise(function (resolve, reject) {
                Job.show(id)
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (err) {
                    reject(err);
                });
            });
        },

        create: function (job) {
            var job = _(job).omitBy(_.isUndefined).omitBy(_.isNull).omitBy(_.isEmpty).value();
            return new Promise(function (resolve, reject) {
                validation.run(job)
                .then(function () {
                    job.id = uuid.v1();
                    Job.create(job)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
                })
                .catch(function (err) {
                    var error = AppError.validationError(err);
                    reject(error);
                });
            });
        },

        update: function (id, job) {
            var job = _(job).omitBy(_.isUndefined).omitBy(_.isNull).omitBy(_.isEmpty).value();
            return new Promise(function (resolve, reject) {
                validation.run(job)
                .then(function () {
                    Job.update(id, job)
                    .then(function (response) {
                        resolve(response);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
                })
                .catch(function (err) {
                    var error = AppError.validationError(err);
                    reject(error);
                });
            });
        }
    }
})();
