var db = require("../db");

// Get all applicants
exports.Index = function(callBack) {
  db("applicant").count().then(function(result)
  {
    callBack(null,result)
  })
};

exports.Create = function(callBack) {
  db("applicant").count().then(function(result)
  {
    callBack(null,result)
  })
};

