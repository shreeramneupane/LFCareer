exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('applicant_stage', function (table) {
    //PK
    table.uuid('id').notNullable().primary();

    //Fields
    table.date('created_date').notNullable();
    table.date('event_date').notNullable();

    //FK
    table.uuid('job_id').nullable().references('id').inTable('job').onDelete('CASCADE');
    table.uuid('applicant_id').notNullable().references('id').inTable('applicant').onDelete('CASCADE');
    table.uuid('stage_id').notNullable().references('id').inTable('stage').onDelete('CASCADE');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('applicant_stage')
};

