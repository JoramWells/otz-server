/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
const NotificationSubCategory = require('./notificationSubCategory.model');

const Notification = sequelize.define('notifications', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  notificationSubCategoryID: {
    type: DataTypes.UUID,
    references: {
      model: 'notificationSubCategories',
      key: 'id',
    },
  },
  notificationDescription: {
    type: DataTypes.STRING,
  },

});

Notification.belongsTo(NotificationSubCategory, { foreignKey: 'notificationSubCategoryID' });

// (async () => {
//   await sequelize.sync();
//   console.log('Notification Table synced successfully');
// })();

module.exports = Notification;
