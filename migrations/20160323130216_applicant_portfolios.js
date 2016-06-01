exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('applicant_portfolios', function (table) {
    //PK
    table.uuid('id').notNullable().primary();

    //Fields
    table.string('project_name', 60).notNullable();
    table.string('link', 80);
    table.text('description', 'mediumtext').notNullable();
    table.timestamps();

    //FK
    table.uuid('applicant_id').notNullable().references('id').inTable('applicants');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('applicant_portfolios')
};
