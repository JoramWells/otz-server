/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
// const Hospital = require('../../Hospital/models/hospital.model');

const LabTest = sequelize.define('labTests', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  specimenID: {
    type: DataTypes.UUID,
    references: {
      model: 'labSpecimens',
      key: 'id',
    },
    onDelete: 'CASCADE',
    allowNull: false

  },

  reasons: {
    type: DataTypes.JSON,
    defaultValue: {},
  },
  normalValues: {
    type: DataTypes.STRING,
  },

});

// InternalLabRequest.belongsTo(Patient, { foreignKey: 'patientID' });
// InternalLabRequests.belongsTo(Hospital, { foreignKey: 'hospitalID' });

// (async () => {
//   await sequelize.sync();
//   console.log('Lab requests Table synced successfull');
// })();

module.exports = LabTest;
