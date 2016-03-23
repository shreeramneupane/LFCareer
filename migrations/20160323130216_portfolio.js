
exports.up = function(knex, Promise)
{
  return knex.schema

  .createTable('portfolio',function(tb1)
  {
    //PK
    tb1.increments();

    //Fields
    tb1.string('project_name', 60).notNullable().defaultTo('n/a');
    tb1.string('link', 80).notNullable().defaultTo('n/a');
    tb1.text('description', 'mediumtext').notNullable();
    tb1.integer('applicant_id', 30).notNullable().references('id').inTable('applicant');
  })


};

exports.down = function(knex, Promise)
{
  return knex.schema.dropTableIfExists('portfolio')
};
