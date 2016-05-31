var uuid = require('node-uuid');

exports.seed = function (knex, Promise) {
  var tableName = 'stages';

  var rows = [
    {id: uuid.v1(), created_at: new Date(), name: 'ShortList'},
    {id: uuid.v1(), created_at: new Date(), name: 'Phone Interview'},
    {id: uuid.v1(), created_at: new Date(), name: 'Face to Face Interview'},
    {id: uuid.v1(), created_at: new Date(), name: 'Benched'},
    {id: uuid.v1(), created_at: new Date(), name: 'Hired'},
    {id: uuid.v1(), created_at: new Date(), name: 'Rejected'}
  ];

  return knex(tableName)
  .del()
  .then(function () {
    return knex(tableName).insert(rows);
  })
};
