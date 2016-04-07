;
(function () {
    "use strict";

    var checkit = require('checkit');
    var uuid = require('node-uuid');
    var validation = new checkit(require('../validation/stageValidation'));
    var Stage = require('../models/stage');
    var _ = require('lodash');
    var Promise = require("bluebird");
    var AppError = require('../error/AppError');


    module.exports = {

        list: function() {
            return new Promise(function (resolve, reject) {
                Stage.list()
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (err) {
                    reject(err);
                });
            });
        },

        show: function(id) {
            return new Promise(function (resolve, reject) {
                Stage.show(id)
                .then(function (response) {
                    resolve(response);
                })
                .catch(function (err) {
                    reject(err);
                });
            });
        },

        create: function (stage) {
            var stage = _(stage).omitBy(_.isUndefined).omitBy(_.isNull).omitBy(_.isEmpty).value();
            return new Promise(function (resolve, reject) {
                validation.run(stage)
                .then(function () {
                    stage.id = uuid.v1();
                    Stage.create(stage)
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

        update: function(id, stage) {
            var stage = _(stage).omitBy(_.isUndefined).omitBy(_.isNull).omitBy(_.isEmpty).value();
            return new Promise(function (resolve, reject) {
                validation.run(stage)
                .then(function () {
                    Stage.update(id, stage)
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
