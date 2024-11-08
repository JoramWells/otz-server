/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes, UUIDV4, Sequelize } = require('sequelize');
const sequelize = require('../db/connect');
const Comment_type = require('./commentType.models');
const AppModules = require('./appModules');

const AppModuleSession = sequelize.define('appModuleSession', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
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

AppModuleSession.belongsTo(AppModules, { foreignKey: 'appModuleID' });

module.exports = AppModuleSession;
