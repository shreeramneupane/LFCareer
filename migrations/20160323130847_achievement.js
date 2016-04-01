exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('achievement', function (table) {
    //PK
    table.uuid('id').notNullable().primary();

    //Fields
    table.string('title', 60).notNullable();
    table.text('description', 'mediumtext').notNullable();
    table.string('year', 80).notNullable();

    //FK
    table.uuid('applicant_id').notNullable().references('id').inTable('applicant');

  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('achievement')
};
