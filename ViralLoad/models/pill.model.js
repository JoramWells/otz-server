/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
const Patient = require('./patient/patients.models');
// const Hospital = require('../../Hospital/models/hospital.model');

const Pill = sequelize.define('pills', {
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
  currentARTRegimen: {
    type: DataTypes.STRING,
  },
  noOfPills: {
    type: DataTypes.INTEGER,
  },
  refillDate: {
    type: DataTypes.DATE,
  },

});

Pill.belongsTo(Patient, { foreignKey: 'patientID' });
// InternalLabRequests.belongsTo(Hospital, { foreignKey: 'hospitalID' });

// (async () => {
//   await sequelize.sync();
//   console.log('Lab requests Table synced successfull');
// })();

module.exports = Pill;
