'use strict';
module.exports = function (sequelize, DataTypes) {
  var JobStage = sequelize.define('JobStage', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    job_id: DataTypes.UUID,
    stage_id: DataTypes.UUID,
    precedence_number: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function (models) {
        JobStage.belongsTo(models.Job);
        JobStage.belongsTo(models.Stage);
      }
    },
    underscored: true,
    tableName: 'job_stages'
  });
  return JobStage;
};
