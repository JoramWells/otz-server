const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');

const AppModules = sequelize.define('appModules', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  title: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,

    allowNull: false,

  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: { type: DataTypes.STRING, allowNull: false },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,

  },
  // end
});

sequelize.sync();

module.exports = AppModules;
