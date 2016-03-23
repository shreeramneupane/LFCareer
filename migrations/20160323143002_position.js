
exports.up = function(knex, Promise)
{
  return knex.schema

  .createTable('position',function(tb1)
  {
    //PK
    tb1.increments();

    //Fields
    tb1.string('title', 60).notNullable().defaultTo('n/a');
    tb1.longtext('description', 'mediumtext').notNullable();
    tb1.longtext('specification', 'mediumtext').notNullable();
  })


};

exports.down = function(knex, Promise)
{
  return knex.schema.dropTableIfExists('position')
};
