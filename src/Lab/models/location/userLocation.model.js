/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
const Patient = require('../patient/patients.models');

const UserLocation = sequelize.define('userLocation', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
    },
    patientID: {
        type: DataTypes.UUID,
        references: {
            model: 'patients',
            key: 'id',
        },
        allowNull: false
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
});

// (async () => {
//   await sequelize.sync();
//   console.log('LOCATION Table synced successfully');
// })();
UserLocation.belongsTo(Patient, { foreignKey: 'patientID' });

module.exports = UserLocation;