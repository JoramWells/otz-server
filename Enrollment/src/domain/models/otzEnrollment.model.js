/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../db/connect');
// const Patient = require('../../Patient/models/patients.models');
const ART = require('./arts/art.model');
const Patient = require('./patients/patients.models');
const ArtRegimenPhase = require('./arts/artRegimenPhases.model');

const OTZEnrollment = sequelize.define('otzEnrollments', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    // defaultValue: UUIDV4,
    autoIncrement: true,
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
  // artStartDate: {
  //   type: DataTypes.DATE,
  // },
  // originalARTRegimen: {
  //   type: DataTypes.UUID,
  //   references: {
  //     model: 'arts',
  //     key: 'id',
  //   },
  //   onDelete: 'CASCADE',

  // },
  vlResults: {
    type: DataTypes.STRING,
  },
  dateOfVL: {
    type: DataTypes.DATE,
  },
  isValid: {
    type: DataTypes.STRING,
  },
  currentARTRegimen: {
    type: DataTypes.STRING,
    // references: {
    //   model: 'arts',
    //   key: 'id',
    // },
    // onDelete: 'CASCADE',

  },
  currentARTStartDate: {
    type: DataTypes.DATE,
  },

  currentRegimenLine: {
    type: DataTypes.UUID,
  },
});


// OTZEnrollment.belongsTo(ART, { foreignKey: 'originalARTRegimen', targetKey: 'id' });
// OTZEnrollment.belongsTo(ART, { foreignKey: 'currentARTRegimen', targetKey: 'id' });
OTZEnrollment.belongsTo(Patient, { foreignKey: 'patientID', targetKey: 'id' });
// OTZEnrollment.belongsTo(ArtRegimenPhase, { foreignKey: 'currentRegimenLine', targetKey: 'id' });

// (async () => {
//   await sequelize.sync();
//   console.log('OTZ Enrollment Tal synced successfully');
// })();

module.exports = OTZEnrollment;
