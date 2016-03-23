
exports.up = function(knex, Promise)
{
  return knex.schema

  .createTable('experience',function(tb1)
  {
    //PK
    tb1.increments();

    //Fields
    tb1.string('company_name', 60).notNullable().defaultTo('n/a');
    tb1.string('designation', 80).notNullable().defaultTo('n/a');
    tb1.date('from_date').notNullable().defaultTo('n/a');
    tb1.date('to_date').notNullable().defaultTo('n/a');
    tb1.integer('applicant_id', 30).notNullable().references('id').inTable('applicant');
  })


};

exports.down = function(knex, Promise)
{
  return knex.schema.dropTableIfExists('experience')
};
