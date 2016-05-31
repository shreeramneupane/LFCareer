exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('work_areas', function (table) {
    //PK
    table.uuid('id').notNullable().primary();

    //Fields
    table.string('name', 60).notNullable();
    table.timestamps();
  });

};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('work_areas')
};