exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('applicant_skill', function (table) {
    //Fields
    table.uuid('applicant_id').notNullable().references('id').inTable('applicant').onDelete('CASCADE');
    table.uuid('skill_id').notNullable().references('id').inTable('skill').onDelete('CASCADE');
    table.primary(['applicant_id', 'skill_id']);
  })

};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('applicant_skill')
};

