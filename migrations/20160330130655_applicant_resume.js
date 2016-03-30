exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('applicant_resume', function (table) {
    //PK
    table.uuid('id').notNullable().primary();

    //Fields
    table.string('resume').notNullable();

    //FK
    table.uuid('applicant_id').references('id').inTable('applicant');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('applicant_resume')
};
