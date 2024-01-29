/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
const ART = require('../../ArtRegimen/models/artDetails.model');

const OTZEnrollment = sequelize.define('enrollments', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  patientID: {
    type: DataTypes.UUID,
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
      references: 'id',
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
      references: 'id',
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

// (async () => {
//   await sequelize.sync();
//   console.log('Patient Table synced successfully');
// })();

module.exports = OTZEnrollment;
