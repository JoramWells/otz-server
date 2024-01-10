/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');
const User = require('./user.models');

const Priorioty_home_visit_form = sequelize.define('priorioty_home_visit_form', {
    priorioty_home_visit_form_id:
     {type: DataTypes.INTEGER,
       primaryKey: true,
     },
    date_home_visit_is_booked:
     { type: DataTypes.STRING },
     client_enrollment_no:
     {type: DataTypes.INTEGER },
     resons_for_home_visit_id:
     { type: DataTypes.INTEGER },
     booked_by_id:
     { type: DataTypes.STRING },
     is_confirmed_chv:
     {type: DataTypes.STRING },
    date_home_visit_is_done:
     { type: DataTypes.INTEGER },
     confirm_outcome_is_documented_in_the_emr_date:
     { type: DataTypes.STRING },
     validated_and_accounted_by_cordinator_date:
     {type: DataTypes.STRING },
    comment:
     { type: DataTypes.STRING },
    
     //end
});
Priorioty_home_visit_form.belongsTo(User,{foreignKey:"booked_by_id", targetKey: "user_id"})
Priorioty_home_visit_form.belongsTo(Comment_type,{foreignKey:"comment_by", targetKey: "comment_type_id"})