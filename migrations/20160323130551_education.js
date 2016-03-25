exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('education', function (table) {
    //PK
    table.increments();

    //Fields
    table.string('degree', 60).notNullable();
    table.string('university', 80).notNullable();
    table.string('college', 80).notNullable();
    table.date('passed_year').notNullable();
    table.string('grade', 80).notNullable();

    //FK
    table.integer('applicant_id', 30).notNullable().references('id').inTable('applicant');

  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('education')
};
