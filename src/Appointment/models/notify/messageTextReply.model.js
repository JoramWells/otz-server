/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');

const MessageTextReply = sequelize.define('messagesTextReplies', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  messageText: {
    type: DataTypes.STRING,
  },

});

// (async () => {
//   await sequelize.sync();
//   console.log('NotificationType Table synced successfully');
// })();

module.exports = MessageTextReply;
