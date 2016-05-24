exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('applicants_stages', function (table) {
    //PK
    table.uuid('id').notNullable().primary();

    //Fields
    table.date('event_date').notNullable();
    table.date('created_date').notNullable();

    //FK
    table.uuid('applicant_id').notNullable().references('id').inTable('applicants').onDelete('CASCADE');
    table.uuid('stage_id').notNullable().references('id').inTable('stages').onDelete('CASCADE');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('applicants_stages')
};

