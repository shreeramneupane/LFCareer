exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('stage', function (table) {
    //PK
    table.increments();

    //Fields
    table.string('name', 60).notNullable();
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('stage')
};
