/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
const Patient = require('./patient/patients.models');

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
    type: DataTypes.STRING,
  },
  departureHomeTime: {
    type: DataTypes.STRING,
  },
  arrivalTime: {
    type: DataTypes.STRING,
  },
  departureTime: {
    type: DataTypes.STRING,
  },
  arrivalHomeTime: {
    type: DataTypes.STRING,
  },
  morningPlace: {
    type: DataTypes.STRING,
  },
  morningTime: {
    type: DataTypes.STRING,
  },
  eveningPlace: {
    type: DataTypes.STRING,
  },
  eveningTime: {
    type: DataTypes.STRING,
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
