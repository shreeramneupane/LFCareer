'use strict';
module.exports = function (sequelize, DataTypes) {
  var Stage = sequelize.define('Stage', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [5, 50],
          msg: 'Please provide name within 5 to 50 characters.'
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
        // associations can be defined here
      }
    },
    underscored: true,
    tableName: 'stages'
  });
  return Stage;
};
