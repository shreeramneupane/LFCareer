"use strict";

var Repository = require('./repository.js');
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
      Repository.list('applicants', searchStatement, filterStatement, sortStatement , paginationAttribute, jointFields)
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
      Repository.show('applicants', id, jointFields)
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
      Repository.create('applicants', applicant)
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
      Repository.update('applicants', id, applicant)
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
  table_name: 'applicant_uploads',
  attributes: ['resume', 'profile_picture'],
  foreign_key: 'applicant_id'
}];
