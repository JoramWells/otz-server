/* eslint-disable no-console */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
const Patient = require('../../models/patient/patients.models');
const ART = require('./art.model');

const ARTPrescription = sequelize.define(
  'artPrescription',
  {
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
      onDelete: 'CASCADE',

    },

    artID: {
      type: DataTypes.UUID,
      references: {
        model: 'arts',
        key: 'id',
      },
      onDelete: 'CASCADE',

    },
    refillDate: {
      type: DataTypes.DATE,
    },
    noOfTablets: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true },
);

ARTPrescription.belongsTo(ART, { foreignKey: 'artID' });
ARTPrescription.belongsTo(Patient, { foreignKey: 'patientID' });

// (async () => {
//   await sequelize.sync();
//   console.log('ART Categorygt Table synced Successfully');
// })();

module.exports = ARTPrescription;
