exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('work_area', function (table) {
    //PK
    table.uuid('id').notNullable().primary();

    //Fields
    table.string('name', 60).notNullable();
  });

};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('work_area')
};
