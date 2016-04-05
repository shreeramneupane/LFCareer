;
(function () {
    "use strict";

    var utilityService = require('../services/utilityService');
    var stageService = require('../services/stageService');
    var HttpStatus = require('http-status-codes');
    var Stage = require('../models/stage');
    var AppError = require('../error/AppError');
    var _ = require('lodash');

    module.exports = {

        index: function (request, response) {
            stageService.list()
            .then(function (data) {
                response.status(HttpStatus.OK).json(data);
            })
            .catch(function (err) {
                var statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
                var error = new AppError(err.root, err.message, err.type);
                if (error instanceof AppError && err.code) {
                    statusCode = HttpStatus.getStatusText(err.code); // convert type to http error code
                    console.log(statusCode);
                }
                response.status(statusCode).json({error: {
                    message: err.message, code: err.code, type: err.type
                }});
            });
        },

        show: function (request, response) {
            var id = request.params.id;

            Stage.show(id)
            .then(function (data) {
                if (typeof data === 'undefined') {
                    throw new Error();
                }
                response.status(HttpStatus.OK).json(data);
            })
            .catch(function (err) {
                err = 'Can not fetch stage with id: ' + id;
                response.status(HttpStatus.BAD_REQUEST).json({error: err});
            });
        },

        create: function (request, response) {
            var stage = request.body;

            stage = _(stage).omitBy(_.isUndefined).omitBy(_.isNull).omitBy(_.isEmpty).value();

            stageService.validate(stage)
            .then(function () {
                utilityService.addUUID(stage);
                Stage.create(stage)
                .then(function (data) {
                    response.status(HttpStatus.OK).json(stage);
                })
                .catch(function (err) {
                    response.status(HttpStatus.BAD_REQUEST).json({error: err});
                });
            })
            .catch(function (err) {
                response.status(HttpStatus.BAD_REQUEST).json({error: err});
            });
        },

        update: function (request, response) {
            var id = request.params.id;
            var stage = request.body;

            stage = _(stage).omitBy(_.isUndefined).omitBy(_.isNull).omitBy(_.isEmpty).value();

            stageService.validate(stage)
            .then(function () {
                Stage.update(id, stage)
                .then(function (data) {
                    Stage.show(data[0])
                    .then(function (updatedStage) {
                        response.status(HttpStatus.OK).json(updatedStage)
                    })
                })
                .catch(function (err) {
                    err = "Can not update stage with provided parameters.";
                    response.status(HttpStatus.BAD_REQUEST).json({error: err});
                });
            })
            .catch(function (err) {
                response.status(HttpStatus.BAD_REQUEST).json({error: err});
            });

        }
    };
})();
