'use strict';
module.exports = function (sequelize, DataTypes) {
  var ApplicantAchievement = sequelize.define('ApplicantAchievement', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    year: DataTypes.INTEGER,
    applicant_id: DataTypes.UUID
  }, {
    classMethods: {
      associate: function(models) {
        ApplicantAchievement.belongsTo(models.Applicant);
      }
    },
    underscored: true,
    tableName: 'applicant_achievements'
  });
  return ApplicantAchievement;
};
