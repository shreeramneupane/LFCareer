

exports.up = function(knex, Promise)
{
  return knex.schema


  .createTable('reference',function(tb1)
  {
    //PK
    tb1.increments();

    //Fields
    tb1.string('full_name', 60).notNullable().defaultTo('n/a');
    tb1.string('organization', 80).notNullable().defaultTo('n/a');
    tb1.string('designation', 80).notNullable().defaultTo('n/a');
    tb1.string('email', 80).notNullable().defaultTo('n/a');
    tb1.string('phone_number', 20).notNullable().defaultTo('n/a');
    tb1.string('relationship', 80).notNullable().defaultTo('n/a');
    tb1.integer('applicant_id', 30).notNullable().references('id').inTable('applicant');

  })


};

exports.down = function(knex, Promise)
{
  return knex.schema.dropTableIfExists('reference')
};
