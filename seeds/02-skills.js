var uuid = require('node-uuid');

exports.seed = function (knex, Promise) {
  var tableName = 'skills';

  var rows = [
    {id: uuid.v1(), created_at: new Date(), name: 'Ruby on Rails'},
    {id: uuid.v1(), created_at: new Date(), name: 'Node.js'},
    {id: uuid.v1(), created_at: new Date(), name: 'AngularJS'},
    {id: uuid.v1(), created_at: new Date(), name: 'Angular2'},
    {id: uuid.v1(), created_at: new Date(), name: 'Java'},
    {id: uuid.v1(), created_at: new Date(), name: 'Python'},
    {id: uuid.v1(), created_at: new Date(), name: 'PHP'},
    {id: uuid.v1(), created_at: new Date(), name: 'JavaScript'},
    {id: uuid.v1(), created_at: new Date(), name: 'JQuery'},
    {id: uuid.v1(), created_at: new Date(), name: 'AJAX'},
    {id: uuid.v1(), created_at: new Date(), name: 'HTML'},
    {id: uuid.v1(), created_at: new Date(), name: 'CSS'},
    {id: uuid.v1(), created_at: new Date(), name: 'CSS3'},
    {id: uuid.v1(), created_at: new Date(), name: 'Responsive Design'},
    {id: uuid.v1(), created_at: new Date(), name: 'Android'},
    {id: uuid.v1(), created_at: new Date(), name: 'iOS'}
  ];

  return knex(tableName)
  .del()
  .then(function () {
    return knex(tableName).insert(rows);
  })
};
