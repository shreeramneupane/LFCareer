exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('skills', function (table) {
    //PK
    table.uuid('id').notNullable().primary();

    //Fields
    table.string('name', 60).notNullable();
    table.date('created_date').notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('skills')
};
