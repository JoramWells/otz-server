/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
const Patient = require('../patient/patients.models');

const TimeAndWork = sequelize.define('timeAndWork', {
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
  wakeUpTime: {
    type: DataTypes.TIME,
  },
  departureHomeTime: {
    type: DataTypes.TIME,
  },
  arrivalWorkTime: {
    type: DataTypes.TIME,
  },
  departureWorkTime: {
    type: DataTypes.TIME,
  },
  arrivalHomeTime: {
    type: DataTypes.TIME,
  },
  morningPlace: {
    type: DataTypes.STRING,
  },
  morningMedicineTime: {
    type: DataTypes.TIME,
  },
  eveningPlace: {
    type: DataTypes.STRING,
  },
  eveningMedicineTime: {
    type: DataTypes.TIME,
  },
  medicineStorage: {
    type: DataTypes.STRING,
  },
  toolsAndCues: {
    type: DataTypes.STRING,
  },
  goal: {
    type: DataTypes.STRING,
  },
});

TimeAndWork.belongsTo(Patient, { foreignKey: 'patientID' });
// Patient.hasMany(TimeAndWork, { foreignKey: 'patientID' });

// (async () => {
//   await sequelize.sync();
//   console.log('Table synced successfully');
// })();

module.exports = TimeAndWork;
