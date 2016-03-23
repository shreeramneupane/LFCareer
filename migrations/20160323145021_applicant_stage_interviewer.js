
exports.up = function(knex, Promise)
{
  return knex.schema

  .createTable('applicant_stage_interviewer',function(tb1)
  {
    //PK
    tb1.increments();

    //Fields

    tb1.integer('applicant_stage_id').notNullable().references('id').inTable('applicant_stage').onDelete('CASCADE');
    tb1.integer('interviewer_id').notNullable().references('id').inTable('interviewer').onDelete('CASCADE');
    tb1.primary(['applicant_stage_id', 'interviewer_id']);
  })


};

exports.down = function(knex, Promise)
{
  return knex.schema.dropTableIfExists('applicant_stage_interviewer')
};

