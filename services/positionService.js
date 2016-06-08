"use strict";

var Promise = require("bluebird");

var models = require('../models/index');

module.exports = {
  list: function () {
    return new Promise(function (resolve, reject) {
      models.Position.findAll({})
      .then(function (response) {
        resolve({positions: response});
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  show: function (id) {
    return new Promise(function (resolve, reject) {
      models.Position.find({where: {id: id}})
      .then(function (response) {
        resolve({position: response});
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  create: function (positionParam) {
    return new Promise(function (resolve, reject) {
      models.Position.create(positionParam)
      .then(function (response) {
        resolve({position: response});
      })
      .catch(function (err) {
        reject(err);
      });
    });
  },

  update: function (id, positionParam) {
    return new Promise(function (resolve, reject) {
      models.Position.find({
        where: {
          id: id
        }
      })
      .then(function(position) {
        if(position){
          position.updateAttributes(positionParam)
          .then(function(response) {
            resolve({position: response});
          });
        }
      })
      .catch(function (err) {
        reject(err);
      });
    });
  }
};
