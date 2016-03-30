exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('reference', function (table) {
    //PK
    table.uuid('id').notNullable().primary();

    //Fields
    table.string('full_name', 60).notNullable();
    table.string('organization', 80).notNullable();
    table.string('designation', 80).notNullable();
    table.string('email', 80).notNullable();
    table.string('phone_number', 20).notNullable();
    table.string('relationship', 80).notNullable();

    //FK
    table.uuid('applicant_id').notNullable().references('id').inTable('applicant');

  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('reference')
};
