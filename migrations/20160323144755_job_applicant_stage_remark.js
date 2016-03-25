exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('job_applicant_stage_remark', function (tb1) {
    //PK
    tb1.increments();

    //Fields
    tb1.date('created_date').notNullable();
    tb1.text('remark', 'mediumtext').notNullable();

    //FK
    tb1.integer('applicant_stage_id', 30).references('id').inTable('applicant_stage');
  });

};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('job_applicant_stage_remark')
};
