/* eslint-disable camelcase */
const {DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../db/connect');

const Art_regimen_phase = sequelize.define('art_regimen_phases', {
  art_regimen_phase_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  art_regimen_phase_description: {
    type: DataTypes.STRING,
  },
});

// (async () => {
//   await sequelize.sync({force: true});
//   console.log('Table synced successfully');
// })();


module.exports = Art_regimen_phase;
