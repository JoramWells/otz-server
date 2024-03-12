/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
const Patient = require('../../Enrollment/src/domain/models/patients/patients.models');
const ARTSwitchReason = require('./artSwitchReasons.model');
const ART = require('./art.model');
const ArtRegimenPhase = require('./artRegimenPhases.model');

const ARTRegimenSwitch = sequelize.define(
  'artRegimenSwitch',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
      unique: true,
    },
    patientID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'patients',
        key: 'id',
      },
    },
    regimenLine: {
      type: DataTypes.UUID,
    },
    switchDate:{
      type: DataTypes.DATE
    },
    switchReason: {
      type: DataTypes.UUID,
    },
  },
  {
    timestamps: true,
  },
);

ARTRegimenSwitch.belongsTo(Patient, { foreignKey: 'patientID' })
ARTRegimenSwitch.belongsTo(ART, { foreignKey: 'regimenLine' })
ARTRegimenSwitch.belongsTo(ArtRegimenPhase, { foreignKey: 'regimenLine' })
ARTRegimenSwitch.belongsTo(ARTSwitchReason, { foreignKey:'switchReason'})

// (async () => {
//   await sequelize.sync();
//   console.log('ART Switch Reason Table synced successfully');
// })();

module.exports = ARTRegimenSwitch;
