exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('applicant_stage_remark', function (table) {
    //PK
    table.uuid('id').notNullable().primary();

    //Fields
    table.text('remark', 'mediumtext').notNullable();
    table.date('created_date').notNullable();

    //FK
    table.uuid('applicant_stage_id').references('id').inTable('applicant_stage');
  });

};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('applicant_stage_remark')
};
