exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('applicant_educations', function (table) {
    //PK
    table.uuid('id').notNullable().primary();

    //Fields
    table.string('degree', 60).notNullable();
    table.string('university', 80).notNullable();
    table.string('college', 80).notNullable();
    table.date('passed_year').notNullable();
    table.string('grade', 80).notNullable();
    table.timestamp('created_date').notNullable();

    //FK
    table.uuid('applicant_id').notNullable().references('id').inTable('applicants');

  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('application_educations')
};
