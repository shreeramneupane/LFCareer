exports.up = function(knex, Promise)
{
  return knex.schema

  .createTable('stage',function(tb1)
  {
    //PK
    tb1.increments();
    tb1.string('name', 60).notNullable().defaultTo('n/a');
  })
};

exports.down = function(knex, Promise)
{
  return knex.schema.dropTableIfExists('stage')
};
