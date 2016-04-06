exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('applicant_upload', function (table) {

    //Fields
    table.string('resume').notNullable();
    table.string('profile_picture').notNullable();

    //FK
    table.uuid('applicant_id').references('id').inTable('applicant');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('applicant_upload')
};
