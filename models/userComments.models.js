/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes } = require('sequelize');
const sequelize = require('../../db/connect');
const User = require('./user.models');
const Comment_type = require('./commentType.models');

const User_comment = sequelize.define('user_comment', {
    user_comment_id:
     {type: DataTypes.STRING,
       primaryKey: true,
     },
    user_id:
     { type: DataTypes.INTEGER },
     comment_type_id:
     {type: DataTypes.INTEGER },
     //end
});

User_comment.belongsTo(User,{foregnKey:"user_id"})
User_comment.belongsTo(Comment_type,{foregnKey:"comment_type_id"})

module.exports= User_comment