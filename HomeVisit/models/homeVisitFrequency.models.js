/* eslint-disable camelcase */
const {DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../../db/connect');

const HomeVisitFrequency = sequelize.define('homeVisitFrequencies', {
  homeVisit_frequency_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  homeVisitFrequencyDescription: {
    type: DataTypes.STRING,
  },
});

// (async () => {
//   await sequelize.sync();
//   console.log('Freq Table synced successfully');
// })();

module.exports = HomeVisitFrequency;