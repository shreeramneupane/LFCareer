;(function () {
    "use strict";

    var db = require('../db');
    var repository = require('./repository.js');
    var Promise = require("bluebird");


    module.exports = {

        list: function () {
            return new Promise(function (resolve, reject) {
                repository.list('stage').then(function(data){
                    resolve(data);
                })
                .catch(function(err){
                    reject(err);
                });
            });
        },

        show: function (id) {
            return repository.show('stage', id);
        },

        create: function (stage) {
            return repository.create('stage', stage);
        },

        update: function (id, stage) {
            return repository.update('stage', id, stage);
        }
    };
})();
