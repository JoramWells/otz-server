/* eslint-disable camelcase */
const {DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../../db/connect');

const HomeVisitReason = sequelize.define('homeVisitReason', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  homeVisitReasonDescription: {
    type: DataTypes.STRING,
  },
});


// (async () => {
//   await sequelize.sync();
//   console.log('Table synced successfully');
// })();

module.exports = HomeVisitReason;
