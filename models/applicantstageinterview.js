'use strict';
module.exports = function(sequelize, DataTypes) {
  var ApplicantStageInterview = sequelize.define('ApplicantStageInterview', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    schedule: DataTypes.DATE,
    from_time: DataTypes.TIME,
    to_time: DataTypes.TIME,
    meeting_room: DataTypes.STRING,
    interviewers_email: DataTypes.UUID,
    applicant_stage_id: DataTypes.UUID
  }, {
    classMethods: {
      associate: function(models) {
        ApplicantStageInterview.belongsTo(models.ApplicantStage)
      }
    },
    underscored: true,
    tableName: 'applicant_stage_interviews'
  });
  return ApplicantStageInterview;
};
