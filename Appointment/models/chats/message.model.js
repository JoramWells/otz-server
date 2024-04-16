/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes, UUIDV4, Sequelize } = require('sequelize');
const sequelize = require('../../db/connect');
const Chat = require('./chat.model');

const ChatMessage = sequelize.define('chatMessages', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  chatID: {
    type: DataTypes.UUID,
    references: {
      model: 'chats',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  text: {
    type: DataTypes.STRING,
  },
});

ChatMessage.belongsTo(Chat, { foreignKey: 'chatID' });

// ChatMessage.afterUpdate(async () => {
//   console.log('@@@@@@');
// });

// (async () => {
//   await sequelize.sync();
//   console.log('ChatMessage D Table synced successfully');
// })();

module.exports = ChatMessage;
