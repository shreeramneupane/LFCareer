exports.up = function (knex, Promise) {
  return knex.schema
  .createTable('interviewer', function (table) {
    //PK
    table.increments();

    //Fields
    table.string('name', 60).notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('interviewer')
};
