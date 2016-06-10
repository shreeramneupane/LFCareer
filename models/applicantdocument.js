'use strict';
module.exports = function (sequelize, DataTypes) {
  var ApplicantDocument = sequelize.define('ApplicantDocument', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    resume: DataTypes.STRING,
    profile_picture: DataTypes.STRING,
    applicant_id: DataTypes.UUID
  }, {
    classMethods: {
      associate: function (models) {
        ApplicantDocument.belongsTo(models.Applicant);
      }
    },
    underscored: true,
    tableName: 'applicant_documents'
  });
  return ApplicantDocument;
};
