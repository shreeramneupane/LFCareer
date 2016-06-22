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
    is_termination: DataTypes.BOOLEAN,
    precedence_number: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function (models) {
        Stage.belongsToMany(models.Job, {through: models.JobStage});
        Stage.belongsToMany(models.Applicant, {through: models.ApplicantStage});
      }
    },
    underscored: true,
    tableName: 'stages'
  });
  return Stage;
};
