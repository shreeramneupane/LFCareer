"use strict";

var repository = require('./repository.js');
var Promise = require("bluebird");
var _ = require('lodash');

module.exports = {

  list: function (parsedUrl) {

    var searchStatement = _.find(parsedUrl, { 'type': 'search' });
    var sortStatement = _.find(parsedUrl, { 'type': 'sort' });
    var filterStatement = [];
    filterStatement = _.filter(parsedUrl, { 'type': 'filter' });
    var paginationAttribute =  _.find(parsedUrl, { 'type': 'paginate' });

    return new Promise(function (resolve, reject) {
      repository.list('applicant', searchStatement, filterStatement, sortStatement , paginationAttribute, jointFields)
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  show: function (id) {
    return new Promise(function (resolve, reject) {
      repository.show('applicant', id, jointFields)
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  create: function (applicant) {
    return new Promise(function (resolve, reject) {
      repository.create('applicant', applicant)
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  update: function (id, applicant) {
    return new Promise(function (resolve, reject) {
      repository.update('applicant', id, applicant)
      .then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },
};
var jointFields = [{
  table_name: 'applicant_upload',
  attributes: ['resume', 'profile_picture']
}];
