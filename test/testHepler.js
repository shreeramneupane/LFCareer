;(function () {
  process.env.NODE_ENV = 'test';

  var knexCleaner = require('knex-cleaner');

  var databaseConfig = require('../knexfile');
  var knex = require('knex')(databaseConfig.test);

  before(function (done) {
    knexCleaner.clean(knex).then(function() {
      done();
    });
  });
})();
