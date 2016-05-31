var uuid = require('node-uuid');

exports.seed = function (knex, Promise) {
  var tableName = 'work_areas';

  var rows = [
    {id: uuid.v1(), created_at: new Date(), name: 'Human Resource'},
    {id: uuid.v1(), created_at: new Date(), name: 'Recruiting'},
    {id: uuid.v1(), created_at: new Date(), name: 'Medical'},
    {id: uuid.v1(), created_at: new Date(), name: 'Health Care'},
    {id: uuid.v1(), created_at: new Date(), name: 'Hospital Management'},
    {id: uuid.v1(), created_at: new Date(), name: 'Automobiles'},
    {id: uuid.v1(), created_at: new Date(), name: 'Loan Management'},
    {id: uuid.v1(), created_at: new Date(), name: 'Financial'},
    {id: uuid.v1(), created_at: new Date(), name: 'Weather'},
    {id: uuid.v1(), created_at: new Date(), name: 'Payment'},
    {id: uuid.v1(), created_at: new Date(), name: 'Advertising'},
    {id: uuid.v1(), created_at: new Date(), name: 'Real State'},
    {id: uuid.v1(), created_at: new Date(), name: 'E-commerce'},
    {id: uuid.v1(), created_at: new Date(), name: 'Online Marketing'},
    {id: uuid.v1(), created_at: new Date(), name: 'Social Networking'},
    {id: uuid.v1(), created_at: new Date(), name: 'Construction Designing'}
  ];

  return knex(tableName)
  .del()
  .then(function () {
    return knex(tableName).insert(rows);
  })
};
