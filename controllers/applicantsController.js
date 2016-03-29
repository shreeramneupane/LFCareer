var express = require('express')
, router = express.Router()
, Applicant = require('../models/applicant');

exports.Index = function(req, res){
  Applicant.Index(function (err, applicants) {
    if(err){
      console.log(err)
    }
    else
    {
      res.send(applicants)
    }
  })
};

exports.Create = function(request, response){
  console.log(request.body);
//  Applicant.Create(function (err, applicant) {
//    if(err){
//      console.log(err)
//    }
//    else
//    {
//      res.send(applicants)
//    }
//  })
};
