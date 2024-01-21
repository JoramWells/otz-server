/* eslint-disable camelcase */
const {DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../../db/connect');

const HomeVisit_reason = sequelize.define('homeVisit_reasons', {
  HomeVisit_reason_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  HomeVisit_reason_description: {
    type: DataTypes.STRING,
  },
});

(async () => {
  await sequelize.sync();
  console.log('Table synced successfully');
})();

module.exports = HomeVisit_reason;
