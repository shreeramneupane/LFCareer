
exports.up = function(knex, Promise)
{
  return knex.schema


  .createTable('portfolio_work_area',function(tb1)
  {
    //PK
    tb1.increments();

    //Fields

    tb1.integer('portfolio_id').notNullable().references('id').inTable('portfolio').onDelete('CASCADE');
    tb1.integer('work_area_id').notNullable().references('id').inTable('work_area').onDelete('CASCADE');
    tb1.primary(['portfolio_id', 'work_area_id']);
  })


};

exports.down = function(knex, Promise)
{
  return knex.schema.dropTableIfExists('portfolio_work_area')
};

