/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../db/connect');

const Comment_type = sequelize.define('comment_type', {
  comment_type_id:
     {
       type: DataTypes.STRING,
       primaryKey: true,
     },
  comment_description:
     { type: DataTypes.STRING },
  // end
});
module.exports = Comment_type;
