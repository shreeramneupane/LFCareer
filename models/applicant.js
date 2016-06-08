'use strict';
module.exports = function (sequelize, DataTypes) {
  var Applicant = sequelize.define('Applicant', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        max: 200
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        max: 200
      }
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        max: 200
      }
    },
    phone_number: DataTypes.STRING,
    linkedin: DataTypes.STRING,
    cover_letter: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [50, 200],
          msg: 'Please provide cover letter within 50 to 200 characters.'
        }
      }
    },
    source: DataTypes.STRING,
    source_description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: false,
        max: {
          arg: 100,
          msg: 'Please provide source description within 100 characters.'
        }
      }
    },
    notification: DataTypes.BOOLEAN,
    hobbies: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: false,
        max: {
          arg: 100,
          msg: 'Please provide hobbies within 100 characters.'
        }
      }
    },
    job_id: DataTypes.UUID,
    direct_apply: DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate: function (models) {
        Applicant.belongsTo(models.Job);
        Applicant.belongsToMany(models.Skill, { through: models.ApplicantSkill });
      }
    },
    underscored: true,
    tableName: 'applicants'
  });
  return Applicant;
};
