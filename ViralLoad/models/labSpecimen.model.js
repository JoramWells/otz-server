/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
// const Hospital = require('../../Hospital/models/hospital.model');

const LabSpecimen = sequelize.define('labSpecimens', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  specimenDescription: {
    type: DataTypes.STRING,
  },
});

// InternalLabRequest.belongsTo(Patient, { foreignKey: 'patientID' });
// InternalLabRequests.belongsTo(Hospital, { foreignKey: 'hospitalID' });

// (async () => {
//   await sequelize.sync();
//   console.log('Lab requests Table synced successfull');
// })();

module.exports = LabSpecimen;
