exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('work_area', function (table) {
    //PK
    table.uuid('id').notNullable().primary();
    table.date('created_date').notNullable();

    //Fields
    table.string('name', 60).notNullable();
  });

};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('work_area')
};
