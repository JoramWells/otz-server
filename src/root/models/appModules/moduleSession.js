/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes, UUIDV4, Sequelize } = require('sequelize');
const sequelize = require('../../db/connect');
const AppModules = require('./appModules');
const User = require('../patient/user.model');

const AppModuleSession = sequelize.define('appModuleSession', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  userID: {
    type: DataTypes.UUID,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
    allowNull: false,
  },
  appModuleID: {
    type: DataTypes.UUID,
    references: {
      model: 'appModules',
      key: 'id',
    },
    onDelete: 'CASCADE',
    allowNull: false,
  },
  connectedAt: {
    type: DataTypes.DATE,
  },
  disconnectedAt: {
    type: DataTypes.DATE,
  },
  duration: {
    type: DataTypes.INTEGER,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
});

AppModuleSession.belongsTo(User, { foreignKey: 'userID' });
AppModuleSession.belongsTo(AppModules, { foreignKey: 'appModuleID' });

module.exports = AppModuleSession;

// (async () => {
//   await sequelize.sync();
//   console.log('ModuleSession Table synced successfully');
// })();
