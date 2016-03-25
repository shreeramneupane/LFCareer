exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('portfolio_work_area', function (table) {
    //Fields
    table.integer('portfolio_id').notNullable().references('id').inTable('portfolio').onDelete('CASCADE');
    table.integer('work_area_id').notNullable().references('id').inTable('work_area').onDelete('CASCADE');
    table.primary(['portfolio_id', 'work_area_id']);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('portfolio_work_area')
};

