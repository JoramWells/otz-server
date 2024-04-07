/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');

const NotificationSubCategory = sequelize.define('notificationSubCategories', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  notificationCategoryID: {
    type: DataTypes.UUID,
    references: {
      model: 'notificationCategories',
      key: 'id',
    },
  },
  notificationSubName: {
    type: DataTypes.STRING,
  },

});

// (async () => {
//   await sequelize.sync();
//   console.log('User Table synced successfully');
// })();

module.exports = NotificationSubCategory;
