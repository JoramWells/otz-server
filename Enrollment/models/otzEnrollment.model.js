/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
// const Patient = require('../../Patient/models/patients.models');
const ART = require('../../ArtRegimen/models/artDetails.model');
const Patient = require('../../Patient/models/patients.models');

const OTZEnrollment = sequelize.define('otzEnrollments', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  patientID: {
    type: DataTypes.UUID,

    // references: {
    //   model: 'patients',
    //   key: 'id',
    // },
  },
  dateOfEnrollmentToOTZ: {
    type: DataTypes.DATE,
  },
  artStartDate: {
    type: DataTypes.DATE,
  },
  originalARTRegimen: {
    type: DataTypes.UUID,

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

  },
  currentARTStartDate: {
    type: DataTypes.DATE,
  },

  // date_confirmed_positive: {
  //   type: DataTypes.DATE,
  // },
});

// Patient.hasMany(OTZEnrollment, { foreignKey: 'patientID' });
OTZEnrollment.belongsTo(ART, { foreignKey: 'originalARTRegimen', targetKey: 'id' });
OTZEnrollment.belongsTo(ART, { foreignKey: 'currentARTRegimen', targetKey: 'id' });
OTZEnrollment.belongsTo(Patient, { foreignKey: 'patientID', targetKey: 'id' });

(async () => {
  await sequelize.sync();
  console.log('OTZ Enrollment Tal synced successfully');
})();

module.exports = OTZEnrollment;
