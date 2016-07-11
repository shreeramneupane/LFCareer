'use strict';

var env = process.env.NODE_ENV || 'development';
var request = require('request');
var Promise = require('bluebird');

var GoogleAuth = require("google-auth-library");
var auth_client = new GoogleAuth();

var GOOGLE_AUTH_SCOPE = ["https://spreadsheets.google.com/feeds"];

var googleAuthCredential = require('../config/secret_config/googleServiceAccountCredentials.json')[env];
var googleSpreadsheet = require('../config/secret_config/googleSpreadsheet.json')[env];

module.exports = {
  interviewResponse: function (uniqueID) {
    return new Promise(function (resolve, reject) {
      authorizeServiceAccount(googleAuthCredential)
      .then(function (googleAuthorizationCredential) {
        var googleSpreadsheetId = googleSpreadsheet['spreadsheet_id'];
        var googleSpreadsheetUrl = googleSpreadsheet['spreadsheet_url'];
        var authorizationHeader = googleAuthorizationCredential.token_type + ' ' + googleAuthorizationCredential.access_token;
        googleSpreadsheetUrl = googleSpreadsheetUrl.replace(':spreadsheet_id', googleSpreadsheetId).replace(':unique_id', uniqueID);

        request({
          url: googleSpreadsheetUrl,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authorizationHeader
          }
        }, function (err, response) {
          if (err || response.headers['content-type'].search(/application\/javascript/) === -1) {
            throw new Error("Can't get records of the associated unique id");
          }
          else {
            var responseBody = response.body;
            var firstIndex = responseBody.indexOf('{');
            var lastIndex = responseBody.lastIndexOf('}');
            var jsonString = responseBody.slice(firstIndex, lastIndex + 1);
            var filledRecord = JSON.parse(jsonString).table;
            if (filledRecord.rows.length) {
              resolve(filledRecord);
            }
            else {
              resolve({});
            }
          }
        });
      })
      .catch(function (err) {
        reject(err)
      })
    });
  }
};

function authorizeServiceAccount(googleAuthCredential) {
  return new Promise(function (resolve, reject) {
    var jwt_client;

    jwt_client = new auth_client.JWT(googleAuthCredential.client_email, null, googleAuthCredential.private_key, GOOGLE_AUTH_SCOPE, null);

    jwt_client.authorize(function (err, token) {
      if (err) {
        reject(new Error('User can not be verified to access google spreadsheet.'));
      }
      resolve(token);
    });
  });
}
