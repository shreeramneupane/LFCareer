exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('experience', function (table) {
    //PK
    table.uuid('id').notNullable().primary();

    //Fields
    table.string('company_name', 60).notNullable();
    table.string('designation', 80).notNullable();
    table.date('from_date').notNullable();
    table.date('to_date').notNullable();

    //FK
    table.uuid('applicant_id').notNullable().references('id').inTable('applicant');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('experience')
};
