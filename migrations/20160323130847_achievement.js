
exports.up = function(knex, Promise)
{
  return knex.schema


  .createTable('achievement',function(tb1)
  {
    //PK
    tb1.increments();

    //Fields
    tb1.string('title', 60).notNullable().defaultTo('n/a');
    tb1.text('description', 'mediumtext').notNullable();
    tb1.string('year', 80).notNullable().defaultTo('n/a');
    tb1.integer('applicant_id', 30).notNullable().references('id').inTable('applicant');

  })

};

exports.down = function(knex, Promise)
{
  return knex.schema.dropTableIfExists('achievement')
};
