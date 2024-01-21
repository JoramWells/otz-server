/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const {DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../../db/connect');

const User = sequelize.define('users', {
  user_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
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
});

// (async () => {
//   await sequelize.sync();
//   console.log('Table synced successfully');
// })();

module.exports=User;
