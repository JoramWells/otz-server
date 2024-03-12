/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');

const ARTSwitchReason = sequelize.define(
  'artSwitchReasons',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
      unique: true,
    },
    reason: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  },
);

// (async () => {
//   await sequelize.sync();
//   console.log('ART Switch Reason Table synced successfully');
// })();

module.exports = ARTSwitchReason;
