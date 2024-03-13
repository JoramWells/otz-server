/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
const ARTSwitchReason = require('./artSwitchReasons.model');
const ART = require('./art.model');
const ArtRegimenPhase = require('./artRegimenPhases.model');
const Patient = require('./patient/patients.models');

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
    artID: {
      type: DataTypes.UUID,
    },
    regimenLineID: {
      type: DataTypes.UUID,
    },
    switchDate:{
      type: DataTypes.DATE
    },
    switchReasonID: {
      type: DataTypes.UUID,
    },
  },
  {
    timestamps: true,
  },
);

ARTRegimenSwitch.belongsTo(Patient, { foreignKey: 'patientID' })
ARTRegimenSwitch.belongsTo(ART, { foreignKey: 'artID' })
ARTRegimenSwitch.belongsTo(ArtRegimenPhase, { foreignKey: 'regimenLineID' })
ARTRegimenSwitch.belongsTo(ARTSwitchReason, { foreignKey:'switchReasonID'})

// (async () => {
//   await sequelize.sync();
//   console.log('ART Switch Reason Table synced successfully');
// })();

module.exports = ARTRegimenSwitch;
