/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');

const Reasons_for_home_visit = sequelize.define('resons_for_home_visit', {
    resons_for_home_visit_id:
     {type: DataTypes.INTEGER,
       primaryKey: true,
     },
     resons_for_home_visit_code:
     { type: DataTypes.STRING },
     resons_for_home_visit_description:
     {type: DataTypes.STRING },

    
     //end
});
