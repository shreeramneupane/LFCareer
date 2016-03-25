exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('applicant_stage', function (table) {
    //PK
    table.increments();

    //Fields
    table.date('created_date').notNullable();
    table.date('event_date').notNullable();

    //FK
    table.integer('job_id').nullable().references('id').inTable('job').onDelete('CASCADE');
    table.integer('applicant_id').notNullable().references('id').inTable('applicant').onDelete('CASCADE');
    table.integer('stage_id').notNullable().references('id').inTable('stage').onDelete('CASCADE');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('applicant_stage')
};

