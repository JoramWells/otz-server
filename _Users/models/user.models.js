/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const {DataTypes} = require('sequelize');
const sequelize = require('../../db/connect');

const User = sequelize.define('user', {
  user_id: {type: DataTypes.INTEGER,
    primaryKey: true,
  },
  first_name: {type: DataTypes.STRING},
  second_name: {type: DataTypes.STRING},
  email: {type: DataTypes.STRING},
  phone_no: {type: DataTypes.STRING},

  // end
});
module.exports=User;
