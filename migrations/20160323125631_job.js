exports.up = function (knex, Promise) {
  return knex.schema

  .createTable('job', function (table) {
    //PK
    table.increments();

    //Fields
    table.string('title', 60).notNullable();
    table.string('intro', 80).notNullable();
    table.string('number_of_opening', 60).notNullable();
    table.date('created_date').notNullable();
    table.date('valid_until').notNullable();
    table.text('description', 'longtext').notNullable();
    table.text('specification', 'longtext').notNullable();

    //FK
    table.integer('position_id', 30).references('id').inTable('position');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('job')
};
