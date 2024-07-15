const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../db/connect');
const Patient = require('./patient/patients.models');
const PatientVisits = require('./patient/patientVisits.model');
// const Patient = require('../../_Patient/models/patients.models');
// const Patients = require('./patients.models');

const VitalSign = sequelize.define('vitalSigns', {
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
  patientVisitID: {
    type: DataTypes.UUID,
    references: {
      model: 'patientVisits',
      key: 'id',
    },
  },
  bmi: {
    type: DataTypes.STRING,
  },
  temperature: {
    type: DataTypes.STRING,
  },
  weight: {
    type: DataTypes.STRING,
  },
  height: {
    type: DataTypes.STRING,
  },
  systolic: {
    type: DataTypes.STRING,
  },
  diastolic: {
    type: DataTypes.STRING,
  },

  muac: {
    type: DataTypes.STRING,
  },
  nutritionalStatus: {
    type: DataTypes.STRING,
  },
  oxygenSAturation: {
    type: DataTypes.STRING,
  },
  pulseRate: {
    type: DataTypes.STRING,
  },
  respiratoryRate: {
    type: DataTypes.STRING,
  },
  lmp: {
    type: DataTypes.DATE,
  },
  gravida: {
    type: DataTypes.STRING,
  },
  parity: {
    type: DataTypes.STRING,
  },
  edd: {
    type: DataTypes.DATE,
  },
});

VitalSign.belongsTo(Patient, { foreignKey: 'patientID' });
VitalSign.belongsTo(PatientVisits, { foreignKey: 'patientVisitID' });

// (async () => {
//   await sequelize.sync();
//   console.log('Table synced successfully');
// })();

module.exports = VitalSign;
