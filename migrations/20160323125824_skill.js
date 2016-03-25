exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('skill', function (table) {
    //PK
    table.increments();

    //Fields
    table.string('name', 60).notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('skill')
};
