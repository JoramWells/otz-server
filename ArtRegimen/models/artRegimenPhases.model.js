/* eslint-disable camelcase */
const {DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../db/connect');

const ArtRegimenPhase = sequelize.define('artRegimenPhases', {
  art_regimen_phase_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
    unique: true,
  },
  artRegimenPhaseDescription: {
    type: DataTypes.STRING,
  },
},
{
  timestamps: true,
},
);

// (async () => {
//   await sequelize.sync();
//   console.log('Table synced successfully');
// })();


module.exports = ArtRegimenPhase;
