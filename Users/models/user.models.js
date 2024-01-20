/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const {DataTypes} = require('sequelize');
const sequelize = require('../../db/connect');

const User = sequelize.define('users', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING,
  },
  middle_name: {
    type: DataTypes.STRING,
  },
  last_name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  phone_no: {
    type: DataTypes.STRING,
  },
  residence: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },

  // end
});
module.exports=User;
