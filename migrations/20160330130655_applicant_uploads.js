exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('applicant_uploads', function (table) {

    //Fields
    table.string('resume').notNullable();
    table.string('profile_picture').notNullable();
    table.timestamp('created_date').notNullable();

    //FK
    table.uuid('applicant_id').references('id').inTable('applicants');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('applicant_uploads')
};
