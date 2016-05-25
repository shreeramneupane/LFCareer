"use strict";

var db = require('../db');
var repository = require('./repository.js');

module.exports = {

  create: function (params) {
    console.log(params)
    return new Promise(function (resolve, reject) {
      repository.create('applicant_uploads',params).then(function(data){
        resolve(data);
      })
      .catch(function(err){
        console.log(err)
        reject(err);
      });
    });
  },

  update: function (applicant_id, applicant_upload) {
    return new Promise(function (resolve, reject) {
      repository.update_upload('applicant_uploads', applicant_id, applicant_upload).then(function (data) {
        resolve(data);
      })
      .catch(function (err) {
        console.log('dsf',err)
        reject(err);
      });
    });
  }
};
