/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../db/connect');
const CareGiver = require('./caregiver.model');

const Patient = sequelize.define('patients', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  careGiverID: {
    type: DataTypes.UUID,
    references: {
      model: 'careGivers',
      key: 'id',
    },
  },
  firstName: {
    type: DataTypes.STRING,
  },
  middleName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.ENUM('MALE', 'FEMALE'),
  },
  dob: {
    type: DataTypes.DATE,
  },
  hospitalID: {
    type: DataTypes.STRING,
  },
});

Patient.belongsTo(CareGiver, { foreignKey: 'careGiverID', targetKey: 'id' });

// (async () => {
//   await sequelize.sync();
//   console.log('Patient Table synced successfully');
// })();

module.exports = Patient;
