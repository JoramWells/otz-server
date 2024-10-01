/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');

const Hospital = sequelize.define(
  'hospitals',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    location: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    mflCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    hospitalName: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    timestamps: true,
  },
);


// (async () => {
//   await sequelize.sync();
//   console.log('Hospital Table synced successfully');
// })();

module.exports = Hospital;
