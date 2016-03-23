
exports.up = function(knex, Promise)
{
  return knex.schema


  .createTable('applicant_skill',function(tb1)
  {
    //PK
    tb1.increments();

    //Fields

    tb1.integer('applicant_id').notNullable().references('id').inTable('applicant').onDelete('CASCADE');
    tb1.integer('skill_id').notNullable().references('id').inTable('skill').onDelete('CASCADE');
    tb1.primary(['applicant_id', 'skill_id']);
  })


};

exports.down = function(knex, Promise)
{
  return knex.schema.dropTableIfExists('applicant_skill')
};

