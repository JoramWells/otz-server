/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');

const Patient = sequelize.define('patients', {
  id: {
    type: DataTypes.INTEGER,
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
    type: DataTypes.DATEONLY,
  },
  phoneNo: {
    type: DataTypes.STRING,
  },
}, { timestamps: false });

// (async () => {
//   await sequelize.sync();
//   console.log('Patient Table synced successfully');
// })();

module.exports = Patient;
