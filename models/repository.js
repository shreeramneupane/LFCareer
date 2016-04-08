"use strict";

var db = require('../db');
var Promise = require("bluebird");
var AppError = require('../error/AppError');
var _ = require('lodash');

module.exports = {
  list: function (table, associatedFields, searchParam) {

    return new Promise(function (resolve, reject) {
      var query = db(table);
      associatedJoin(query, table, associatedFields)
      .then(function () {

        if (!_.isEmpty(searchParam)) {
          var qs = _.times(searchParam.fields.length, function () {
            return searchParam.q;
          });
          
          query.whereRaw(this.searchQueryBuilder(searchParam.fields), qs);
        }

        query.select(table + '.*')
        .then(function (response) {
          resolve(response);
        })
      })
      .catch(function (err) {
        var error = AppError.renderError(err);
        reject(error);
      });
    });
  },

  show: function (table, id, associatedFields) {
    return new Promise(function (resolve, reject) {
      var query = db(table);
      associatedJoin(query, table, associatedFields)
      .then(function () {
        query.where("id", id).first().select(table + '.*')
        .then(function (response) {
          if (typeof response === 'undefined') {
            throw new Error();
          }
          resolve(response);
        })
      })
      .catch(function () {
        var error = AppError.renderError(err);
        reject(error);
      });
    });
  },

  create: function (table, entity) {
    return new Promise(function (resolve, reject) {
      db(table)
      .insert(entity)
      .then(function () {
        resolve(entity);
      })
      .catch(function (err) {
        var error = AppError.renderError(err);
        reject(error);
      });
    })
  },

  update: function (table, id, entity) {
    return new Promise(function (resolve, reject) {
      db(table)
      .where('id', id)
      .update(entity)
      .then(function () {
        db(table).where("id", id).first()
        .then(function (updatedData) {
          resolve(updatedData);
        });
      })
      .catch(function (err) {
        var error = AppError.renderError(err);
        reject(error);
      });
    });
  },

  update_upload: function (table, id, entity) {
    return new Promise(function (resolve, reject) {
      db(table)
      .where('applicant_id', id)
      .update(entity)
      .then(function () {
        db(table).where("applicant_id", id).first()
        .then(function (updatedStage) {
          resolve(updatedStage);
        });
      })
      .catch(function (err) {
        var error = AppError.renderError(err);
        reject(error);
      });
    });
  },

  searchQueryBuilder: function (fields) {
    var rawQuery = '';
    for (var i = 0; i < fields.length; i++) {
      if (i !== 0) {
        rawQuery += " OR ";
      }
      rawQuery += "LOWER(" + fields[i] + ") like '%' || LOWER(?) || '%'"
    }
    console.log(rawQuery);
    return rawQuery;
  }
};

function associatedJoin(query, table, associatedFields) {
  return new Promise(function (resolve, reject) {
    if (!_.isEmpty(associatedFields)) {
      for (var i = 0; i < associatedFields.length; i++) {
        var nestedField = associatedFields[i];
        var nestedAttributes = associatedFields[i].attributes;

        query.join(nestedField.table_name, table + '.id', nestedField.table_name + '.' + table + '_id').select(nestedAttributes)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (err) {
          var error = AppError.renderError(err);
          reject(error);
        })
      }
    }
    resolve(true);
  });
}

