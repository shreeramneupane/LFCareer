'use strict';
module.exports = function (sequelize, DataTypes) {
  var ApplicantStage = sequelize.define('ApplicantStage', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    applicant_id: DataTypes.UUID,
    stage_id: DataTypes.UUID
  }, {
    classMethods: {
      associate: function (models) {
        ApplicantStage.belongsTo(models.Applicant);
        ApplicantStage.belongsTo(models.Stage);
        ApplicantStage.hasOne(models.ApplicantStageInterview);
        ApplicantStage.hasOne(models.ApplicantStageRemark);
      }
    },
    underscored: true,
    tableName: 'applicant_stages'
  });
  return ApplicantStage;
};
