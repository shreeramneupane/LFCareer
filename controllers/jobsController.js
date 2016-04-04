;
(function () {
    "use strict";

    var utilityService = require('../services/utilityService');
    var jobService = require('../services/jobService');
    var HttpStatus = require('http-status-codes');
    var Job = require('../models/job');

    var _ = require('lodash');

    module.exports = {

        index: function (request, response) {
            //Handling the promise here
            Job.index()
            .then(function (data) {
                response.status(HttpStatus.OK).json(data);
            })
            .catch(function (err) {
                err = 'Cannot fetch jobs';
                response.status(HttpStatus.BAD_REQUEST).json({error: err});
            });
        },

        show: function (request, response) {
            var id = request.params.id;

            Job.show(id)
            .then(function (data) {
                if (typeof data === 'undefined') {
                    throw new Error();
                }
                response.status(HttpStatus.OK).json(data);
            })
            .catch(function (err) {
                err = 'Can not fetch job with id: ' + id;
                response.status(HttpStatus.BAD_REQUEST).json({error: err});
            });
        },

        create: function (request, response) {
            var job = request.body;

            job = _(job).omitBy(_.isUndefined).omitBy(_.isNull).omitBy(_.isEmpty).value();

            jobService.validate(job)
            .then(function () {
                utilityService.addUUID(job);
                Job.create(job)
                .then(function (data) {
                    response.status(HttpStatus.OK).json(job);
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
            var job = request.body;

            job = _(job).omitBy(_.isUndefined).omitBy(_.isNull).omitBy(_.isEmpty).value();

            jobService.validate(job)
            .then(function () {
                Job.update(id, job)
                .then(function (data) {
                    Job.show(data[0])
                    .then(function (updatedJob) {
                        response.status(HttpStatus.OK).json(updatedJob)
                    })
                })
                .catch(function (err) {
                    err = "Can not update job with provided parameters.";
                    response.status(HttpStatus.BAD_REQUEST).json({error: err});
                });
            })
            .catch(function (err) {
                response.status(HttpStatus.BAD_REQUEST).json({error: err});
            });

        }
    };
})();
