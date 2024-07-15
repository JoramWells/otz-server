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
      defaultValue: UUIDV4,
    },
    patientID: {
      type: DataTypes.UUID,
      references: {
        model: 'patients',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    type: {
      type: DataTypes.ENUM('self care', 'clinical encounter'),
      defaultValue: 'self care',
      allowNull: false,
    },

  },
  {
    postgresql: {
      fillFactor: 70,
    },
    timestamps: true,
  },
);

PatientVisits.belongsTo(Patient, { foreignKey: 'patientID' });

// (async () => {
//     await sequelize.sync();
//     console.log('Patient Table synced successfully');
// })();

module.exports = PatientVisits;
