'use strict';
module.exports = function (sequelize, DataTypes) {
  var ApplicantReference = sequelize.define('ApplicantReference', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    full_name: DataTypes.STRING,
    designation: DataTypes.STRING,
    organization: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    relationship: DataTypes.STRING,
    applicant_id: DataTypes.UUID
  }, {
    classMethods: {
      associate: function (models) {
        ApplicantReference.belongsTo(models.Applicant);
      }
    },
    underscored: true,
    tableName: 'applicant_references'
  });
  return ApplicantReference;
};
