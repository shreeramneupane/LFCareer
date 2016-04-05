;
(function () {
    "use strict";

    var checkit = require('checkit');
    var uuid = require('node-uuid');
    var validation = new checkit(require('../validation/stageValidation'));
    var Stage = require('../models/stage');
    var _ = require('lodash');
    var Promise = require("bluebird");


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

        show: function(id, callback) {
            Stage.show(id, callback);
        },

        create: function (stage, callback) {
            var stage = _(stage).omitBy(_.isUndefined).omitBy(_.isNull).omitBy(_.isEmpty).value();

            validation.run(stage)
            .then(function () {
                stage.id = uuid.v1();
                Stage.create(stage, callback)
            })
            .catch(function (err) {
                callback(err, null);
            });
        },

        update: function(id, position, callback) {
            var stage = _(stage).omitBy(_.isUndefined).omitBy(_.isNull).omitBy(_.isEmpty).value();

            validation.run(stage)
            .then(function () {
                Stage.update(id, position, callback)
            })
            .catch(function (err) {
                callback(err, null);
            });
        }
    }
})();
