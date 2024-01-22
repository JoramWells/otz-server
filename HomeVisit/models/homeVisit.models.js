/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const {DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../../db/connect');
const Patient = require('../../Patient/models/patients.models');
const User = require('../../Users/models/user.models');
const HomeVisit_reason = require('./reasonDetails.model');
const Art_regimen = require('../../ArtRegimen/models/artRegimens.model');

const Home_visit_detail = sequelize.define('home_visit_details', {
  home_visit_detail_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  patient_id: {
    type: DataTypes.UUID,
    references: {
      model: 'patients',
      key: 'patient_id',
    },
    onDelete: 'CASCADE',
  },
  homeVisit_reason_id: {
    type: DataTypes.UUID,
    references: {
      model: 'homeVisit_reasons',
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
  art_detail_id: {
    type: DataTypes.UUID,
    references: {
      model: 'art_regimens',
      key: 'art_regimen_id',
    },
    onDelete: 'CASCADE',
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

Home_visit_detail.belongsTo(Patient, {foreignKey: 'patient_id'});
Home_visit_detail.belongsTo(User, {foreignKey: 'user_id'});
Home_visit_detail.belongsTo(Art_regimen, {foreignKey: 'art_detail_id',
  targetKey: 'art_regimen_id'});
Home_visit_detail.belongsTo(HomeVisit_reason,
    {foreignKey: 'homeVisit_reason_id'});

(async () => {
  await sequelize.sync();
  console.log('Table synced successfully');
})();

module.exports = Home_visit_detail;


