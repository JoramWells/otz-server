/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { DataTypes, UUIDV4, Sequelize } = require('sequelize');
const sequelize = require('../../db/connect');

const Chat = sequelize.define('chats', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  appointmentID: {
    type: DataTypes.UUID,
    references: {
      model: 'appointments',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  members: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
});

// Chat.afterUpdate(async () => {
//   console.log('@@@@@@');
// });

// (async () => {
//   await sequelize.sync();
//   console.log('Chat D Table synced successfully');
// })();

module.exports = Chat;