/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');

const NotificationCategory = sequelize.define('notificationCategories', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  notificationName: {
    type: DataTypes.STRING,
  },
  notificationCategory: {
    type: DataTypes.STRING,
  },
  notificationSubCategory: {
    type: DataTypes.STRING,
  },
});

// (async () => {
//   await sequelize.sync();
//   console.log('User Table synced successfully');
// })();

module.exports = NotificationCategory;
