/* eslint-disable camelcase */
const { UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
const Patient = require('../patient/patients.models');
const PatientVisits = require('../patient/patientVisits.model');
// const Hospital = require('../../Hospital/models/hospital.model');

const ViralLoad = sequelize.define('viralLoads', {
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
    defaultValue: false,
  },

  patientVisitID: {
    type: DataTypes.UUID,
    references: {
      model: 'patientVisits',
      key: 'id',
    },
    onDelete: 'CASCADE',
    unique: true,
    allowNull: false

  },
  patientID: {
    type: DataTypes.UUID,
    references: {
      model: 'patients',
      key: 'id',
    },
    onDelete: 'CASCADE',
    allowNull: false


  },
  userID: {
    type: DataTypes.UUID,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
    allowNull: false


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
ViralLoad.belongsTo(PatientVisits, { foreignKey: 'patientVisitID' });

// ViralLoad.belongsTo(Hospital, { foreignKey: 'hospitalID' });

// (async () => {
//   await sequelize.sync();
//   console.log('VL Table synced successfully');
// })();

module.exports = ViralLoad;
