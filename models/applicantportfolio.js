'use strict';
module.exports = function(sequelize, DataTypes) {
  var ApplicantPortfolio = sequelize.define('ApplicantPortfolio', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    project_name: DataTypes.STRING,
    description: DataTypes.STRING,
    link: DataTypes.STRING,
    applicant_id: DataTypes.UUID
  }, {
    classMethods: {
      associate: function(models) {
        ApplicantPortfolio.belongsTo(models.Applicant);
        ApplicantPortfolio.belongsToMany(models.Workarea, { through: models.ApplicantPortfolioWorkarea });
      }
    },
    underscored: true,
    tableName: 'applicant_portfolios'
  });
  return ApplicantPortfolio;
};
