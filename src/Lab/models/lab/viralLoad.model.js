/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
const Patient = require('../patient/patients.models');
// const Hospital = require('../../Hospital/models/hospital.model');

const ViralLoad = sequelize.define('viralLoad', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  vlResults: {
    type: DataTypes.INTEGER,
  },
  isVLValid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  patientID: {
    type: DataTypes.UUID,
    references: {
      model: 'patients',
      key: 'id',
    },
  },
   userID: {
    type: DataTypes.UUID,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  vlJustification: {
    type: DataTypes.STRING,
  },
  dateOfVL: {
    type: DataTypes.DATE,
  },
   dateOfNextVL: {
    type: DataTypes.DATE,
  },
  // CD4

});

ViralLoad.belongsTo(Patient, { foreignKey: 'patientID' });
// ViralLoad.belongsTo(Hospital, { foreignKey: 'hospitalID' });

// (async () => {
//   await sequelize.sync();
//   console.log('VL Table synced successfully');
// })();

module.exports = ViralLoad;
