/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');

const NotificationType = sequelize.define('notificationTypes', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  notificationTypeName: {
    type: DataTypes.STRING,
  },

});

// (async () => {
//   await sequelize.sync();
//   console.log('NotificationType Table synced successfully');
// })();

module.exports = NotificationType;
