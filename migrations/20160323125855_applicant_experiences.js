exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('applicant_experiences', function (table) {
    //PK
    table.uuid('id').notNullable().primary();

    //Fields
    table.string('company_name', 60).notNullable();
    table.string('designation', 80).notNullable();
    table.date('from_date').notNullable();
    table.date('to_date').notNullable();
    table.timestamp('created_date').notNullable();

    //FK
    table.uuid('applicant_id').notNullable().references('id').inTable('applicants');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('applicant_experiences')
};
