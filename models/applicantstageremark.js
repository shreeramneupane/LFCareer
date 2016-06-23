'use strict';
module.exports = function(sequelize, DataTypes) {
  var ApplicantStageRemark = sequelize.define('ApplicantStageRemark', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    applicant_stage_id: DataTypes.UUID,
    remark: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        ApplicantStageRemark.belongsTo(models.ApplicantStage)
      }
    },
    underscored: true,
    tableName: 'applicant_stage_remarks'
  });
  return ApplicantStageRemark;
};
