/* eslint-disable camelcase */
const {DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../db/connect');
const ART = require('../../ArtRegimen/models/artDetails.model');

const Patient = sequelize.define('Patients', {
  patientID: {
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
  mflCode: {
    type: DataTypes.STRING,
  },
  cccNo: {
    type: DataTypes.STRING,
  },
  dateOfEnrollmentToOTZ: {
    type: DataTypes.DATE,
  },
  artStartDate: {
    type: DataTypes.DATE,
  },
  originalARTRegimen: {
    type: DataTypes.UUID,
    references: {
      model: 'ARTs',
      references: 'artID',
    },
    onDelete: 'CASCADE',
  },
  vlCopies: {
    type: DataTypes.STRING,
  },
  dateOfVL: {
    type: DataTypes.DATE,
  },
  vlDoneAnnually: {
    type: DataTypes.BOOLEAN,
  },
  currentARTRegimen: {
    type: DataTypes.UUID,
    references: {
      model: 'ARTs',
      references: 'artID',
    },
    onDelete: 'CASCADE',
  },
  currentARTStartDate: {
    type: DataTypes.DATE,
  },
  // date_confirmed_positive: {
  //   type: DataTypes.DATE,
  // },
}, {
  timestamps: true,
});

Patient.belongsTo(ART, {foreignKey: 'originalARTRegimen', targetKey: 'artID'});
Patient.belongsTo(ART, {foreignKey: 'currentARTRegimen', targetKey: 'artID'});

(async () => {
  await sequelize.sync();
  console.log('Patient Table synced successfully');
})();

module.exports = Patient;
