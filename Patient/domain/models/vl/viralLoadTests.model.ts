/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { DataTypes, UUIDV4 } from "sequelize";
const sequelize = require("../../db/connect");
const Patient = require("../patients.models");

const ViralLoad = sequelize.define('viralLoad', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  vlResults: {
    type: DataTypes.STRING,
  },

  isValid: {
    type: DataTypes.STRING,
  },
  patientID: {
    type: DataTypes.UUID,
    references: {
      model: 'patients',
      key: 'id',
    },
  },
  lastVLJustification: {
    type: DataTypes.STRING,
  },
  dateConfirmedPositive: {
    type: DataTypes.DATEONLY,
  },
  dateOfCurrentVL: {
    type: DataTypes.DATEONLY,
  },
  dateOfNextVL: {
    type: DataTypes.DATEONLY,
  },
});

ViralLoad.belongsTo(Patient, { foreignKey: 'patientID' });
Patient.hasMany(ViralLoad, { foreignKey: 'patientID' });

// (async () => {
//   await sequelize.sync();
//   console.log('Viral Load Results Table synced successfully');
// })();

module.exports = ViralLoad;
