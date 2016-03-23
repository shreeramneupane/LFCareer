
exports.up = function(knex, Promise)
{
  return knex.schema

  .createTable('applicant',function(tb1)
  {
    //PK
    tb1.increments();

    //Fields
    tb1.string('name', 60).notNullable().defaultTo('n/a');
    tb1.string('email', 80).notNullable().defaultTo('n/a');
    tb1.string('address', 60).notNullable().defaultTo('n/a');
    tb1.string('phone_number', 60).notNullable().defaultTo('n/a');
    tb1.string('linkedin', 60);
    tb1.string('profile_image', 60);
    tb1.string('resume', 60);
    tb1.text('cover_letter', 'mediumtext').notNullable();
    tb1.string('phone_number', 60).notNullable().defaultTo('n/a');
    tb1.boolean('notification').notNullable();
    tb1.string('source', 60);
    tb1.date('applied_date').notNullable().defaultTo('n/a');
    tb1.integer('job_id', 30).references('id').inTable('job');

  })


};

exports.down = function(knex, Promise)
{
  return knex.schema.dropTableIfExists('applicant')
};
