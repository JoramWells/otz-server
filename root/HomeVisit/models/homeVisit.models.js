/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');
const Patient = require('../../models/patient/patients.models');
const User = require('../../Users/models/user.models');
const ART = require('../../ArtRegimen/models/art.model');
const HomeVisitReason = require('./HomeVisitReason.model');
const ARTPrescription = require('../../ArtRegimen/models/artPrescription.model');
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
    type: DataTypes.STRING,
  },
  homeVisitFrequencyID: {
    type: DataTypes.UUID,
    references: {
      model: 'homeVisitFrequencies',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  artPrescriptionID: {
    type: DataTypes.UUID,
    // references: {
    //   model: 'artPrescription',
    //   key: 'id',
    // },
    // onDelete: 'CASCADE',
  },
  date_of_home_visit_requested: {
    type: DataTypes.STRING,
  },
  medicine_counted: {
    type: DataTypes.STRING,
  },
  medicine_status: {
    type: DataTypes.STRING,
  },
  action_taken: {
    type: DataTypes.STRING,
  },
  return_to_clinic: {
    type: DataTypes.STRING,
  },
  is_pills_counted: {
    type: DataTypes.STRING,
  },
  is_clinic_visits: {
    type: DataTypes.STRING,
  },
  is_disclosure: {
    type: DataTypes.STRING,
  },
  is_guardian_support: {
    type: DataTypes.STRING,
  },
  is_support_group_attendance: {
    type: DataTypes.STRING,
  },
  is_household_tested: {
    type: DataTypes.STRING,
  },

  // e
});

HomeVisit.belongsTo(ART, { foreignKey: 'artPrescriptionID' });
HomeVisit.belongsTo(Patient, { foreignKey: 'patientID' });
HomeVisit.belongsTo(User, { foreignKey: 'userID' });
HomeVisit.belongsTo(HomeVisitReason, { foreignKey: 'homeVisitReasonID' });
// HomeVisit.belongsTo(ARTPrescription, { foreignKey: 'artPrescriptionID' });

// (async () => {
//   await sequelize.sync().then(() => { console.log('Home visit Table synced successfully'); })
//     .catch((err) => console.log(err));
// })();

module.exports = HomeVisit;