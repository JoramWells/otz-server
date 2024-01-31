/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
// const Patient = require('../../Patient/models/patients.models');
const ART = require('../../ArtRegimen/models/art.model');
const Patient = require('../../Patient/models/patients.models');

const OTZEnrollment = sequelize.define('otzEnrollments', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    // defaultValue: UUIDV4,
    autoIncrement: true,
  },
  patientID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'patients',
      key: 'id',
    },
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
      model: 'arts',
      key: 'id',
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
      model: 'arts',
      key: 'id',
    },
    onDelete: 'CASCADE',

  },
  currentARTStartDate: {
    type: DataTypes.DATE,
  },

  // date_confirmed_positive: {
  //   type: DataTypes.DATE,
  // },
});

OTZEnrollment.belongsTo(ART, { foreignKey: 'originalARTRegimen', targetKey: 'id' });
OTZEnrollment.belongsTo(ART, { foreignKey: 'currentARTRegimen', targetKey: 'id' });
OTZEnrollment.belongsTo(Patient, { foreignKey: 'patientID', targetKey: 'id' });

// (async () => {
//   await sequelize.sync();
//   console.log('OTZ Enrollment Tal synced successfully');
// })();

module.exports = OTZEnrollment;
