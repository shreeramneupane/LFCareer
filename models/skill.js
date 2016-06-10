'use strict';
module.exports = function (sequelize, DataTypes) {
  var Skill = sequelize.define('Skill', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        Skill.belongsToMany(models.Applicant, { through: models.ApplicantSkill });
      }
    },
    underscored: true,
    tableName: 'skills'
  });
  return Skill;
};
