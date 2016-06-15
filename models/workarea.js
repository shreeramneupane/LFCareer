'use strict';
module.exports = function (sequelize, DataTypes) {
  var Workarea = sequelize.define('Workarea', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        Workarea.belongsToMany(models.ApplicantPortfolio, { through: models.ApplicantPortfolioWorkarea });
      }
    },
    underscored: true,
    tableName: 'workareas'
  });
  return Workarea;
};
