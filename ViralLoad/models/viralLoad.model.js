/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
const Patient = require('../../Patient/models/patients.models');
const Hospital = require('../../Hospital/models/hospital.model');

const ViralLoad = sequelize.define('viralLoads', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  vlResult: {
    type: DataTypes.STRING,
  },
  vlValidity: {
    type: DataTypes.STRING,
  },
  patientID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'patients',
      key: 'id',
    },
  },
  hospitalID: {
    type: DataTypes.UUID,
    references: {
      model: 'hospitals',
      key: 'id',
    },
  },
  vlJustification: {
    type: DataTypes.STRING,
  },
  lastVlDate: {
    type: DataTypes.DATEONLY,
  },
  currentVlDate: {
    type: DataTypes.DATEONLY,
  },
});

ViralLoad.belongsTo(Patient, { foreignKey: 'patientID' });
ViralLoad.belongsTo(Hospital, { foreignKey: 'hospitalID' });

// (async () => {
//   await sequelize.sync();
//   console.log('Table synced successfully');
// })();

module.exports = ViralLoad;
