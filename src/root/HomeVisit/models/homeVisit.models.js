/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
const Patient = require('../../models/patient/patients.models');
const User = require('../../Users/models/user.models');
const ART = require('../../ArtRegimen/models/art.model');
const HomeVisitReason = require('./HomeVisitReason.model');
const ARTPrescription = require('../../ArtRegimen/models/artPrescription.model');
const HomeVisitFrequency = require('./homeVisitFrequency.models');
// const HomeVisitReason = require('./HomeVisitReason.model');
// const ART = require('../../ArtRegimen/models/art.model');

const HomeVisit = sequelize.define('homeVisits', {
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
  homeVisitReasonID: {
    type: DataTypes.UUID,
    references: {
      model: 'homeVisitReasons',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  userID: {
    type: DataTypes.UUID,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  dateRequested: {
    type: DataTypes.DATE,
  },
  homeVisitFrequencyID: {
    type: DataTypes.UUID,
    references: {
      model: 'homeVisitFrequencies',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  artPrescription: {
    type: DataTypes.JSONB,
    // references: {
    //   model: 'artPrescription',
    //   key: 'id',
    // },
    // onDelete: 'CASCADE',
  },
  tbPrescription: {
    type: DataTypes.JSONB,
  },

  noOfPills: {
    type: DataTypes.INTEGER,
  },
  medicineStatus: {
    type: DataTypes.STRING,
  },
  actionTaken: {
    type: DataTypes.STRING,
  },
  returnToClinic: {
    type: DataTypes.DATE,
  },
  isPillsCounted: {
    type: DataTypes.BOOLEAN,
  },
  isClinicVisits: {
    type: DataTypes.BOOLEAN,
  },
  isDisclosure: {
    type: DataTypes.BOOLEAN,
  },
  isGuardianSupport: {
    type: DataTypes.BOOLEAN,
  },
  isSupportGroupAttendance: {
    type: DataTypes.BOOLEAN,
  },
  isHouseholdTested: {
    type: DataTypes.BOOLEAN,
  },

  // e
});

HomeVisit.belongsTo(ART, { foreignKey: 'artPrescriptionID' });
HomeVisit.belongsTo(Patient, { foreignKey: 'patientID' });
HomeVisit.belongsTo(User, { foreignKey: 'userID' });
HomeVisit.belongsTo(HomeVisitReason, { foreignKey: 'homeVisitReasonID' });
HomeVisit.belongsTo(HomeVisitFrequency, { foreignKey: 'homeVisitFrequencyID' });

// (async () => {
//   await sequelize.sync().then(() => { console.log('Home visit Table synced successfully'); })
//     .catch((err) => console.log(err));
// })();

module.exports = HomeVisit;
