exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('applicant_stages_interviewers', function (table) {
    //Fields
    table.uuid('applicant_stage_id').notNullable().references('id').inTable('applicants_stages').onDelete('CASCADE');
    table.uuid('interviewer_id').notNullable().references('id').inTable('interviewers').onDelete('CASCADE');
    table.timestamps();

    //PK
    table.primary(['applicant_stage_id', 'interviewer_id']);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('applicant_stages_interviewers')
};

