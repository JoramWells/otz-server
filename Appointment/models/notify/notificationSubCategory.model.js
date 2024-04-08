/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
const NotificationCategory = require('./notificationCategory.model');

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
    onDelete: 'CASCADE',
  },
  notificationSubCategoryName: {
    type: DataTypes.STRING,
  },

});

NotificationSubCategory.belongsTo(NotificationCategory, { foreignKey: 'notificationCategoryID' });

// (async () => {
//   await sequelize.sync();
//   console.log('NotificationSubCategory Table synced successfully');
// })();

module.exports = NotificationSubCategory;
