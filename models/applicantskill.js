'use strict';
module.exports = function(sequelize, DataTypes) {
  var ApplicantSkill = sequelize.define('ApplicantSkill', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    applicant_id: DataTypes.UUID,
    skill_id: DataTypes.UUID
  }, {
    classMethods: {
      associate: function(models) {
        ApplicantSkill.belongsTo(models.Applicant);
        ApplicantSkill.belongsTo(models.Skill);
      }
    },
    underscored: true,
    tableName: 'applicant_skills'
  });
  return ApplicantSkill;
};
