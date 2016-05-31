exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('applicant_portfolios_work_areas', function (table) {
    //Fields
    table.uuid('applicant_portfolio_id').notNullable().references('id').inTable('applicant_portfolios').onDelete('CASCADE');
    table.uuid('work_area_id').notNullable().references('id').inTable('work_areas').onDelete('CASCADE');
    table.timestamps();

    //PK
    table.primary(['applicant_portfolio_id', 'work_area_id']);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('applicant_portfolios_work_areas')
};

