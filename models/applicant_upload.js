"use strict";

var db = require('../db');
var repository = require('./repository.js');

module.exports = {

  create: function (applicant_upload) {
    return repository.create('applicant_upload', applicant_upload);
  }
};
