exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('applicants_skills', function (table) {
    //Fields
    table.uuid('applicant_id').notNullable().references('id').inTable('applicants').onDelete('CASCADE');
    table.uuid('skill_id').notNullable().references('id').inTable('skills').onDelete('CASCADE');
    table.timestamp('created_date').notNullable();
    
    //PK
    table.primary(['applicant_id', 'skill_id']);
  })

};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('applicants_skills')
};

