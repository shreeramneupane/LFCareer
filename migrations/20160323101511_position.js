exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('position', function (table) {

    // PK
    table.uuid('id').notNullable().primary();

    // Fields
    table.string('title', 60).notNullable();
    table.text('description', 'longtext').notNullable();
    table.text('specification', 'longtext').notNullable();

  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('position')
};
