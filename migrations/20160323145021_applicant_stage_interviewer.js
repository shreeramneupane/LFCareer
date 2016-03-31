exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('applicant_stage_interviewer', function (table) {
    //Fields
    table.uuid('applicant_stage_id').notNullable().references('id').inTable('applicant_stage').onDelete('CASCADE');
    table.uuid('interviewer_id').notNullable().references('id').inTable('interviewer').onDelete('CASCADE');
    table.primary(['applicant_stage_id', 'interviewer_id']);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('applicant_stage_interviewer')
};

