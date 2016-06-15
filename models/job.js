'use strict';

module.exports = function (sequelize, DataTypes) {
  var Job = sequelize.define('Job', {
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
    intro: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [15, 120],
          msg: 'Please provide intro within 15 to 120 characters.'
        }
      }
    },
    number_of_opening: {
      type: DataTypes.INTEGER,
      validate: {min: 1}
    },
    valid_until: {
      type: DataTypes.DATE,
      validate: {
        isAfter: {
          args: (new Date()).toISOString().substring(0, 10),
          msg: 'Please set upcoming date as valid date.'
        }
      }
    },
    closed_on: DataTypes.DATE,
    description: {
      type: DataTypes.TEXT,
      validate: {
        len: {
          args: [50, 400],
          msg: 'Please provide description within 50 to 400 characters.'
        }
      }
    },
    specification: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: false,
        len: {
          args: [50, 400],
          msg: 'Please provide specification within 50 to 400 characters.'
        }
      }
    },
    position_id: DataTypes.UUID
  }, {
    classMethods: {
      associate: function (models) {
        Job.belongsTo(models.Position);
        Job.hasMany(models.Applicant);
        Job.belongsToMany(models.Stage, {through: models.JobStage});
      }
    },
    underscored: true,
    tableName: 'jobs'
  });
  return Job;
};
