exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('applicant_achievements', function (table) {
    //PK
    table.uuid('id').notNullable().primary();

    //Fields
    table.string('title', 60).notNullable();
    table.text('description', 'mediumtext').notNullable();
    table.string('year', 80).notNullable();
    table.timestamp('created_date').notNullable();

    //FK
    table.uuid('applicant_id').notNullable().references('id').inTable('applicants');

  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('applicant_achievements')
};
