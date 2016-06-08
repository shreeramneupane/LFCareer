'use strict';
module.exports = function(sequelize, DataTypes) {
  var ApplicantPortfolioWorkarea = sequelize.define('ApplicantPortfolioWorkarea', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    applicant_portfolio_id: DataTypes.UUID,
    workarea_id: DataTypes.UUID
  }, {
    classMethods: {
      associate: function(models) {
        ApplicantPortfolioWorkarea.belongsTo(models.ApplicantPortfolio);
        ApplicantPortfolioWorkarea.belongsTo(models.Workarea);
      }
    },
    underscored: true,
    tableName: 'applicant_portfolio_workareas'
  });
  return ApplicantPortfolioWorkarea;
};
