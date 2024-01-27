/* eslint-disable camelcase */
const {DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../db/connect');
const ART = require('../../ArtRegimen/models/artDetails.model');

const Enrollment = sequelize.define('enrollment', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  patientID: {
    type: DataTypes.UUID,
    references: {
      model: 'patients',
      key: 'id',
    },
  },
  dateOfEnrollmentToOTZ: {
    type: DataTypes.DATE,
  },
  artStartDate: {
    type: DataTypes.DATE,
  },
  originalARTRegimen: {
    type: DataTypes.UUID,
    references: {
      model: 'arts',
      references: 'artID',
    },
    onDelete: 'CASCADE',
  },
  vlCopies: {
    type: DataTypes.STRING,
  },
  dateOfVL: {
    type: DataTypes.DATE,
  },
  vlDoneAnnually: {
    type: DataTypes.BOOLEAN,
  },
  currentARTRegimen: {
    type: DataTypes.UUID,
    references: {
      model: 'arts',
      references: 'artID',
    },
    onDelete: 'CASCADE',
  },
  currentARTStartDate: {
    type: DataTypes.DATE,
  },

  // date_confirmed_positive: {
  //   type: DataTypes.DATE,
  // },
});

Patient.belongsTo(ART, {foreignKey: 'originalARTRegimen', targetKey: 'artID'});
Patient.belongsTo(ART, {foreignKey: 'currentARTRegimen', targetKey: 'artID'});

// (async () => {
//   await sequelize.sync();
//   console.log('Patient Table synced successfully');
// })();

module.exports = Enrollment;
