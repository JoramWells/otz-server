const {DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../../Patient/db/connect');
// const Patient = require('../../_Patient/models/patients.models');
// const Patients = require('./patients.models');

const VitalSign = sequelize.define('vitalsign', {
  vital_sign_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,

  },
  patient_id: {
    type: DataTypes.UUID,
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

// (async () => {
//   await sequelize.sync({force: true});
//   console.log('Table synced successfully');
// })();

// VitalSign.belongsTo(Patient, {foreignKey: 'patient_id'});

module.exports = VitalSign;