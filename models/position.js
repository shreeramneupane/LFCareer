'use strict';

module.exports = function (sequelize, DataTypes) {
  var Position = sequelize.define('Position', {
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
    }
  },
  {
    classMethods: {
      associate: function (models) {
        Position.hasMany(models.Job);
      }
    },
    underscored: true,
    tableName: 'positions'
  });
  return Position;
};
