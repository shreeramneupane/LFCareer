exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('experience', function (table) {
    //PK
    table.increments();

    //Fields
    table.string('company_name', 60).notNullable();
    table.string('designation', 80).notNullable();
    table.date('from_date').notNullable();
    table.date('to_date').notNullable();

    //FK
    table.integer('applicant_id', 30).notNullable().references('id').inTable('applicant');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('experience')
};
