'use strict';
module.exports = function(sequelize, DataTypes) {
  var ApplicantExperience = sequelize.define('ApplicantExperience', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    company_name: DataTypes.STRING,
    designation: DataTypes.STRING,
    from_date: DataTypes.DATE,
    to_date: DataTypes.DATE,
    applicant_id: DataTypes.UUID
  }, {
    classMethods: {
      associate: function(models) {
        ApplicantExperience.belongsTo(models.Applicant);
      }
    },
    underscored: true,
    tableName: 'applicant_experiences'
  });
  return ApplicantExperience;
};
