/* eslint-disable no-console */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
const Patient = require('../../models/patient/patients.models');
const ART = require('./art.model');

const ARTPrescription = sequelize.define(
  'prescriptions',
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
    drugID: {
      type: DataTypes.UUID,
      references: {
        model: 'arts',
        key: 'id',
      },
      onDelete: 'CASCADE',

    },
    measuringUnitID: {
      type: DataTypes.UUID,
      references: {
        model: 'measuringUnits',
        key: 'id',
      },
      onDelete: 'CASCADE',

    },
    refillDate: {
      type: DataTypes.DATE,
    },
    noOfPills: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
    },
    frequency: {
      type: DataTypes.INTEGER,
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
