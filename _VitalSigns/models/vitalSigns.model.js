const {DataTypes} = require('sequelize');
const sequelize = require('../../_Patient/db/connect');
const Patient = require('../../_Patient/models/patients.models');
// const Patients = require('./patients.models');

const VitalSign = sequelize.define('vitalsign', {
  vital_sign_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  patient_id: {
    type: DataTypes.INTEGER,
  },
  weight: {
    type: DataTypes.INTEGER,
  },
  height: {
    type: DataTypes.INTEGER,
  },
  bp: {
    type: DataTypes.STRING,
  },
});

// VitalSign.associate = models =>{

// }

Patient.belongsTo(VitalSign, {foreignKey: 'patient_id'});

module.exports = VitalSign;
