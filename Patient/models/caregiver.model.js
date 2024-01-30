/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');

const CareGiver = sequelize.define('careGivers', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
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
  idNo: {
    type: DataTypes.STRING,
  },
  phoneNo: {
    type: DataTypes.STRING,
  },
  locationID: {
    type: DataTypes.STRING,
  },
});

(async () => {
  await sequelize.sync();
  console.log('Patient Table synced Successfully');
})();

module.exports = CareGiver;
