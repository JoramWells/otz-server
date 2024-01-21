/* eslint-disable camelcase */
const {DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../../db/connect');

const HomeVisit_frequency = sequelize.define('homeVisit_frequencies', {
  homeVisit_frequency_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  homeVisit_frequency_description: {
    type: DataTypes.STRING,
  },
});


// (async () => {
//   await sequelize.sync();
//   console.log('Table synced successfully');
// })();

module.exports = HomeVisit_frequency;
