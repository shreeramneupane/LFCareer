exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('job_applicant_stage_remark', function (table) {
    //PK
    table.uuid('id').notNullable().primary();

    //Fields
    table.date('created_date').notNullable();
    table.text('remark', 'mediumtext').notNullable();

    //FK
    table.uuid('applicant_stage_id').references('id').inTable('applicant_stage');
  });

};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('job_applicant_stage_remark')
};
