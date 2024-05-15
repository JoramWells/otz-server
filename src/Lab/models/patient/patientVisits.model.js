/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
const Patient = require('./patients.models');

// const sequelize = require('../../db/connect');
// const School = require('./school.model');
// const Hospital = require('../../Hospital/models/hospital.model');

const PatientVisits = sequelize.define(
  'patientVisits',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      // autoIncrement: true,
      defaultValue: UUIDV4
    },
    patientVisitID: {
      type: DataTypes.UUID,
      references: {
        model: 'patientVisits',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },

  },
  {
    postgresql: {
      fillFactor: 70,
    },
    timestamps: true,
  },
);

PatientVisits.belongsTo(Patient, { foreignKey: 'patientVisits' });

// (async () => {
//     await sequelize.sync();
//     console.log('Patient Table synced successfully');
// })();

module.exports = PatientVisits;
