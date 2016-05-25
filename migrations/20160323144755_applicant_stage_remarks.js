exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('applicant_stage_remarks', function (table) {
    //PK
    table.uuid('id').notNullable().primary();

    //Fields
    table.text('remark', 'mediumtext').notNullable();
    table.timestamp('created_date').notNullable();

    //FK
    table.uuid('applicant_stage_id').references('id').inTable('applicants_stages');
  });

};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('applicant_stage_remarks')
};
