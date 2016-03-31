;(function () {
  "use strict";

  var express = require('express');
  var app = express();

  var databaseConfig = require('./knexfile');
  var knex = require('knex')(databaseConfig[app.settings.env]);

  module.exports = knex;
})();
