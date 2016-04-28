"use strict";

var db = require('../db');
var Promise = require("bluebird");
var AppError = require('../error/AppError');
var _ = require('lodash');

module.exports = {

  list: function (table, searchStatement, filterStatement, sortStatement,  paginationAttribute, jointFields) {

    paginationAttribute = paginationAttribute || { start: '0', offset: '10' };
    sortStatement = sortStatement || {'orderBy':'id'};

    return new Promise(function (resolve, reject) {
      var query = db(table);
      filter(query,  filterStatement)
      .then(function () {
        joinTable(query, table, jointFields)
        .then(function () {
          search(query, searchStatement)
          .then(function () {
            query.select(table + '.*')
            .offset(paginationAttribute.start ).limit(paginationAttribute.offset)
            .orderByRaw(sortStatement.orderBy)
            .then(function (response) {
              resolve(response);
            })
          })
        })
      })
      .catch(function (err) {
        var error = AppError.buildError(err);
        reject(error);
      });
    });
  },

  show: function (table, id, jointFields) {
    return new Promise(function (resolve, reject) {
      var query = db(table);
      joinTable(query, table, jointFields)
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
        var error = AppError.buildError(err);
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
        var error = AppError.buildError(err);
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
        var error = AppError.buildError(err);
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
        var error = AppError.buildError(err);
        reject(error);
      });
    });
  }

};

function filter(query, filters){
  return new Promise(function(resolve, reject){
    if(filters === undefined){
      resolve(true);
    }

    for(var i = 0 ; i < filters.length; i++ ){
      var entity = filters[i];
      if(entity.join){
        query.leftOuterJoin(entity.table, entity.table + '.id', entity.table + '_id');
      }
      query.where(
      db.raw('LOWER(' + entity.table + '.' + entity.attribute + ') = LOWER(?)', entity.searchKey)
      );
    }
    query.then(function (response) {
      resolve(response);
    })
    .catch(function (err) {
      var error = AppError.buildError(err);
      reject(error);
    });

    resolve(true);
  })
};

function search(query, search){

  return new Promise(function(resolve, reject){
    if(search === undefined){
     resolve(true);
    }
    var rawQuery='';
    var searchWord = _.times(search.attribute.length, function () {
      return search.searchKey;
    });

    for (var i = 0; i < search.attribute.length; i++) {
      if (i !== 0) {
        rawQuery += " OR ";
      }
      rawQuery += "LOWER(" + search.attribute[i] + ") like '%' || LOWER(?) || '%'"
    }

    query.whereRaw(rawQuery, searchWord)
    .then(function (response) {
      resolve(response);
    })
    .catch(function (err) {
      var error = AppError.buildError(err);
      reject(error);
    });

  })
};

function joinTable(query, table, jointFields) {
  return new Promise(function (resolve, reject) {

    if (!_.isEmpty(jointFields)) {
      for (var i = 0; i < jointFields.length; i++) {
        var nestedField = jointFields[i];
        var nestedAttributes = jointFields[i].attributes;
        var tableName = nestedField.table_name;

        query.join(tableName, table + '.id', tableName + '.' + table + '_id').select(nestedAttributes)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (err) {
          var error = AppError.buildError(err);
          reject(error);
        })
      }
    }
    resolve(true);
  });
};
