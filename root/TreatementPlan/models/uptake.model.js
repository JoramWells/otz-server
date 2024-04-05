/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../../db/connect');
const TimeAndWork = require('./timeAndWork.model');

const Uptake = sequelize.define('uptake', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  timeAndWorkID: {
    type: DataTypes.UUID,
    references: {
      model: 'timeAndWork',
      key: 'id',
    },
  },
  currentDate: {
    type: DataTypes.DATE,
  },
  morningStatus: {
    type: DataTypes.BOOLEAN,
  },
  eveningStatus: {
    type: DataTypes.BOOLEAN,
  },
});

Uptake.belongsTo(TimeAndWork, { foreignKey: 'timeAndWorkID' });

// (async () => {
//   await sequelize.sync();
//   console.log('Table synced successfully');
// })();

module.exports = Uptake;
