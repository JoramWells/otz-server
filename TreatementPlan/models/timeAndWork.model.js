/* eslint-disable camelcase */
const {DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../../db/connect');

const Time_and_work = sequelize.define('time_and_work', {
  time_and_work_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  patient_id: {
    type: DataTypes.UUID,
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

// (async () => {
//   await sequelize.sync();
//   console.log('Table synced successfully');
// })();

module.exports = Time_and_work;