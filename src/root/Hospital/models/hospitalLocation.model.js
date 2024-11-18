/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
const Hospital = require('./hospital.model');
const User = require('../../models/patient/user.model');

const HospitalLocation = sequelize.define(
  'hospitalLocations',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    hospitalID: {
      type: DataTypes.UUID,
      references: {
        model: 'hospitals',
        key: 'id',
      },
      allowNull: false,
      onDelete: 'CASCADE'
    },
    country: {
      type: DataTypes.STRING,
    },

    city: {
      type: DataTypes.STRING,
    },
    isoCountryCode: {
      type: DataTypes.STRING,
    },
    region: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.STRING,
    },
    longitude: {
      type: DataTypes.STRING,
    },
    locationUpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    locationUpdatedBy: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id',
      },
      allowNull: true,
      onDelete: 'SET NULL',
    },
  },
  {
    timestamps: true,
  },
);

HospitalLocation.belongsTo(Hospital, { foreignKey: 'hospitalID', targetKey: 'id' });
HospitalLocation.belongsTo(User, { foreignKey: 'locationUpdatedBy', targetKey: 'id' });



// (async () => {
//   await sequelize.sync();
//   console.log('Hospital Table synced successfully');
// })();

module.exports = Hospital;
