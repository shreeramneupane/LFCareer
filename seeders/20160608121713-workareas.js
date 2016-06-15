'use strict';

var models = require('../models/index');

module.exports = {
  up: function (queryInterface, Sequelize) {
    var workareas = [
      'Human Resource',
      'Recruiting',
      'Medical',
      'Health Care',
      'Hospital Management',
      'Automobiles',
      'Loan Management',
      'Financial',
      'Weather',
      'Payment',
      'Advertising',
      'Real State',
      'E-commerce',
      'Online Marketing',
      'Social Networking',
      'Construction Designing'
    ];

    return Sequelize.Promise.map(workareas, function (workarea) {
      return models.Workarea.findCreateFind({
        where: {
          name: workarea
        }
      })
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('workareas', null, {});
  }
};
