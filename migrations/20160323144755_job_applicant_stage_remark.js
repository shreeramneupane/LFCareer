
exports.up = function(knex, Promise)
{
  return knex.schema

  .createTable('applicant_stage',function(tb1)
  {
    //PK
    tb1.increments();

    //Fields

    tb1.date('created_date').notNullable().defaultTo('n/a');
    tb1.integer('applicant_stage_id', 30).references('id').inTable('applicant_stage');
    tb1.text('remark', 'mediumtext').notNullable();

  })


};

exports.down = function(knex, Promise)
{
  return knex.schema.dropTableIfExists('applicant_stage')
};
