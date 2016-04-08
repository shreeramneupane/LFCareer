"use strict";

var checkit = require('checkit');
var uuid = require('node-uuid');
var validation = new checkit(require('../validation/applicantValidation'));
var Applicant = require('../models/applicant');
var _ = require('lodash');
var Promise = require("bluebird");
var AppError = require('../error/AppError');

module.exports = {

  list: function (params) {
    var searchParam = {
      q: params.q,
      fields: ['name', 'email', 'address', 'phone_number']
    };

    /**
     * Contains associated information of applicant in applicant_upload table.
     */
    var associatedFields = [{
      table_name: 'applicant_upload',
      attributes: ['resume', 'profile_picture']
    }];

    var filterParam = {
      query: _.pick(params, ['name', 'job']),
      nested_fields: [{
        field: 'job',
        table: 'job',
        attribute: 'title'
      }]
    };

    return new Promise(function (resolve, reject) {
      Applicant.list(searchParam, associatedFields, filterParam)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  show: function (id) {
    var associatedFields = [{
      table_name: 'applicant_upload',
      attributes: ['resume', 'profile_picture']
    }];

    return new Promise(function (resolve, reject) {
      Applicant.show(id, associatedFields)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  create: function (applicant) {
    var applicant = _(applicant).omitBy(_.isUndefined).omitBy(_.isNull).omitBy(_.isEmpty).value();
    return new Promise(function (resolve, reject) {
      validation.run(applicant)
      .then(function () {
        applicant.id = uuid.v1();
        Applicant.create(applicant)
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

  update: function (id, applicant) {
    var applicant = _(applicant).omitBy(_.isUndefined).omitBy(_.isNull).omitBy(_.isEmpty).value();
    return new Promise(function (resolve, reject) {
      validation.run(applicant)
      .then(function () {
        Applicant.update(id, applicant)
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
};

