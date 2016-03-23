
exports.up = function(knex, Promise)
{
  return knex.schema

  .createTable('job',function(tb1)
  {
    //PK
    tb1.increments();

    //Fields
    tb1.string('title', 60).notNullable().defaultTo('n/a');
    tb1.string('intro', 80).notNullable().defaultTo('n/a');
    tb1.string('number_of_opening', 60).notNullable().defaultTo('n/a');
    tb1.date('created_date').notNullable().defaultTo('n/a');
    tb1.date('valid_until').notNullable().defaultTo('n/a');
    tb1.integer('position_id', 30).references('id').inTable('position');
    tb1.longtext('description', 'mediumtext').notNullable();
    tb1.longtext('specification', 'mediumtext').notNullable();

  })


};

exports.down = function(knex, Promise)
{
  return knex.schema.dropTableIfExists('job')
};
