'use strict';
module.exports = function (sequelize, DataTypes) {
  var Stage = sequelize.define('Stage', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [5, 50],
          msg: 'Please provide title within 5 to 50 characters.'
        }
      }
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    is_repeatable: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    precedence_number: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function (models) {
        Stage.hasMany(models.ApplicantStage);
        Stage.hasMany(models.Applicant, {through: models.ApplicantStage});
        Stage.belongsToMany(models.Job, {through: models.JobStage});
      }
    },
    underscored: true,
    tableName: 'stages'
  });
  return Stage;
};
