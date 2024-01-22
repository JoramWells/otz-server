/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const {DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../../db/connect');
const User = require('./user.models');

const Home_visit_detail = sequelize.define('home_visit_details', {
  home_visit_detail_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  homeVisit_reason_id: {
    type: DataTypes.UUID,
  },
  user_id: {
    type: DataTypes.UUID,
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
Home_visit_detail.belongsTo(User,
    {foreignKey: 'booked_by_id', targetKey: 'user_id'});
Home_visit_detail.belongsTo(Comment_type,
    {foreignKey: 'comment_by', targetKey: 'comment_type_id'});
