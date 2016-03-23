

exports.up = function(knex, Promise)
{
  return knex.schema

  .createTable('education',function(tb1)
  {
    //PK
    tb1.increments();

    //Fields
    tb1.string('degree', 60).notNullable().defaultTo('n/a');
    tb1.string('university', 80).notNullable().defaultTo('n/a');
    tb1.string('college', 80).notNullable().defaultTo('n/a');
    tb1.date('passed_year').notNullable().defaultTo('n/a');
    tb1.string('grade', 80).notNullable().defaultTo('n/a');
    tb1.integer('applicant_id', 30).notNullable().references('id').inTable('applicant');

  })


};

exports.down = function(knex, Promise)
{
  return knex.schema.dropTableIfExists('education')
};
