/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const {DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../../db/connect');
const Patient = require('../../Patient/models/patients.models');
const User = require('../../Users/models/user.models');
const HomeVisitReason = require('./HomeVisitReason.model');
const ART = require('../../ArtRegimen/models/artDetails.model');

const HomeVisit = sequelize.define('homeVisits', {
  home_visit_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  patientID: {
    type: DataTypes.UUID,
  },
  homeVisit_reason_id: {
    type: DataTypes.UUID,
    references: {
      model: 'HomeVisitReasons',
      key: 'homeVisit_reason_id',
    },
    onDelete: 'CASCADE',
  },
  user_id: {
    type: DataTypes.UUID,
    references: {
      model: 'users',
      key: 'user_id',
    },
    onDelete: 'CASCADE',
  },
  date_requested: {
    type: DataTypes.STRING,
  },
  homeVisit_frequency_id: {
    type: DataTypes.UUID,
  },
  is_arv: {
    type: DataTypes.STRING,
  },
  current_regimen_date: {
    type: DataTypes.STRING,
  },
  artID: {
    type: DataTypes.UUID,
    // references: {
    //   model: 'arts',
    //   key: 'artID',
    // },
    // onDelete: 'CASCADE',
  },
  ol_drugs: {
    type: DataTypes.STRING,
  },
  is_TB: {
    type: DataTypes.STRING,
  },
  treatment_start_date: {
    type: DataTypes.STRING,
  },
  intensive_phase_date: {
    type: DataTypes.STRING,
  },
  end_of_treatment_date: {
    type: DataTypes.STRING,
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

  // end
});

// HomeVisit.belongsTo(Patient, {foreignKey: 'patientID'});
// Patient.hasMany(HomeVisit, {foreignKey: 'patientID'});
// HomeVisit.belongsTo(User, {foreignKey: 'user_id'});
// HomeVisit.belongsTo(ART, {foreignKey: 'artID'});
// HomeVisit.belongsTo(HomeVisitReason,
//     {foreignKey: 'homeVisit_reason_id'});

// (async () => {
//   await sequelize.sync();
//   console.log('Table synced successfully');
// })();

module.exports = HomeVisit;


