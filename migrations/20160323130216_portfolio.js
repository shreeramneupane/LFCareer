exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('portfolio', function (table) {
    //PK
    table.uuid('id').notNullable().primary();

    //Fields
    table.string('project_name', 60).notNullable();
    table.string('link', 80).notNullable();
    table.text('description', 'mediumtext').notNullable();

    //FK
    table.uuid('applicant_id').notNullable().references('id').inTable('applicant');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('portfolio')
};
