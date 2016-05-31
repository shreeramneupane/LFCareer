exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('positions', function (table) {
    // PK
    table.uuid('id').notNullable().primary();

    // Fields
    table.string('title', 60).notNullable();
    table.text('description', 'longtext').notNullable();
    table.text('specification', 'longtext').notNullable();
    table.timestamps();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('positions')
};
