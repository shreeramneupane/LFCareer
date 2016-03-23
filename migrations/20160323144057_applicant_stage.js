
exports.up = function(knex, Promise)
{
  return knex.schema


  .createTable('applicant_stage',function(tb1)
  {
    //PK
    tb1.increments();

    //Fields

    tb1.integer('job_id').nullable().references('id').inTable('job').onDelete('CASCADE');
    tb1.integer('applicant_id').notNullable().references('id').inTable('applicant').onDelete('CASCADE');
    tb1.integer('stage_id').notNullable().references('id').inTable('stage').onDelete('CASCADE');
    tb1.primary(['job_id', 'applicant_id', 'job_id']);
    tb1.date('created_date').notNullable().defaultTo('n/a');
    tb1.date('event_date').notNullable().defaultTo('n/a');

  })


};

exports.down = function(knex, Promise)
{
  return knex.schema.dropTableIfExists('applicant_stage')
};

