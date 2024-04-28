/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../db/connect');

const Priority_home_visit_form = sequelize.define('priority_home_visit_form', {
  priority_home_visit_form_id:
     {
       type: DataTypes.INTEGER,
       primaryKey: true,
     },
  date_home_visit_is_booked:
     { type: DataTypes.STRING },
  client_enrollment_no:
     { type: DataTypes.INTEGER },
  resons_for_home_visit_id:
     { type: DataTypes.INTEGER },
  booked_by_id:
     { type: DataTypes.STRING },
  is_confirmed_chv:
     { type: DataTypes.STRING },
  date_home_visit_is_done:
     { type: DataTypes.INTEGER },
  confirm_outcome_is_documented_in_the_emr_date:
     { type: DataTypes.STRING },
  validated_and_accounted_by_cordinator_date:
     { type: DataTypes.STRING },
  comment:
     { type: DataTypes.STRING },

  // end
});
