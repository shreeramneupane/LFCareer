'use strict';
module.exports = function(sequelize, DataTypes) {
  var ApplicantEducation = sequelize.define('ApplicantEducation', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    degree: DataTypes.STRING,
    university: DataTypes.STRING,
    college: DataTypes.STRING,
    passed_year: DataTypes.INTEGER,
    grade: DataTypes.STRING,
    applicant_id: DataTypes.UUID
  }, {
    classMethods: {
      associate: function(models) {
        ApplicantEducation.belongsTo(models.Applicant);
      }
    },
    underscored: true,
    tableName: 'applicant_educations'
  });
  return ApplicantEducation;
};
