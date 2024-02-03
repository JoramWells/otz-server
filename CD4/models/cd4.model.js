/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
const Patient = require('../../Patient/models/patients.models');
const Hospital = require('../../Hospital/models/hospital.model');

const CD4 = sequelize.define('cd4', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },

  patientID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'patients',
      key: 'id',
    },
  },
  hospitalID: {
    type: DataTypes.UUID,
    references: {
      model: 'hospitals',
      key: 'id',
    },
  },

  // CD4
  baselineCD4: {
    type: DataTypes.STRING,
  },
  CD4Count: {
    type: DataTypes.STRING,
  },
  currentCD4Date: {
    type: DataTypes.DATEONLY,
  },
  lastCD4Date: {
    type: DataTypes.DATEONLY,
  },

});

CD4.belongsTo(Patient, { foreignKey: 'patientID' });
CD4.belongsTo(Hospital, { foreignKey: 'hospitalID' });

// (async () => {
//   await sequelize.sync();
//   console.log('Table synced successfully');
// })();

module.exports = CD4;
