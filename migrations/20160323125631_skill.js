
exports.up = function(knex, Promise)
{
  return knex.schema


  .createTable('skill',function(tb1)
  {
    //PK
    tb1.increments();

    //Fields


    tb1.string('name', 60).notNullable().defaultTo('n/a');


  })


};

exports.down = function(knex, Promise)
{
  return knex.schema.dropTableIfExists('skill')
};
