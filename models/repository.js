"use strict";

var db = require('../db');

module.exports = {
  list: function (table) {
    return db(table).select();
  },

  show: function (table, id) {
    return db(table).where("id", id).first();
  },

  create: function (table, entity) {
    return db(table).insert(entity);
  },

  update: function (table, id, entity, callback) {
    return db(table)
    .returning('id')
    .where('id', id)
    .update(entity)
  }
};
