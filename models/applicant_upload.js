"use strict";

var db = require('../db');
var repository = require('./repository.js');

module.exports = {

  create: function (params) {
    console.log(params)
    return new Promise(function (resolve, reject) {
      repository.create('applicant_upload',params).then(function(data){
        resolve(data);
      })
      .catch(function(err){
        console.log(err)
        reject(err);
      });
    });
  }
};
