exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('applicant', function (table) {
    //PK
    table.increments();

    //Fields
    table.string('name', 60).notNullable();
    table.string('email', 80).notNullable();
    table.string('address', 60).notNullable();
    table.string('phone_number', 60).notNullable();
    table.string('linkedin', 60);
    table.string('profile_image', 60);
    table.string('resume', 60);
    table.text('cover_letter', 'mediumtext').notNullable();
    table.boolean('notification').notNullable().defaultTo(true);
    table.string('source', 60);
    table.date('applied_date').notNullable();

    //FK
    table.integer('job_id', 30).references('id').inTable('job');
  });

};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('applicant')
};
