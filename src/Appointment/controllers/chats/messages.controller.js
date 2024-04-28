/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const ChatMessage = require('../../models/chats/message.model');
const Notification = require('../../models/notify/notification.models');
const NotificationCategory = require('../../models/notify/notificationCategory.model');
const NotificationSubCategory = require('../../models/notify/notificationSubCategory.model');

// using *Patients model
const addChatMessage = async (req, res, next) => {
  try {
    const results = await ChatMessage.create(req.body);

    res.json(results);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};

// get all priceListItems
const getAllChatMessages = async (req, res, next) => {
  try {
    const results = await ChatMessage.findAll({});
    res.json(results);
    next();
  } catch (error) {
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

const getChatMessage = async (req, res, next) => {
  const { id } = req.params;
  try {
    const patient = await ChatMessage.findOne({
      where: {
        chatID: id,
      },
    });
    res.json(patient);

    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal Server Error' });
    next(error);
  }
};

// edit patient
const editNotification = async (req, res, next) => {
  const { id } = req.params;
  const { notificationDescription } = req.body;
  try {
    const results = await Notification.findOne({
      where: {
        id,
      },
    });

    results.notificationDescription = notificationDescription;
    results.save();

    next();
  } catch (error) {
    res.sendStatus(500).json({ message: 'Internal Server' });
    next(error);
  }
};

const deleteNotification = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await Notification.destroy({
      where: {
        id,
      },
    });

    if (results) {
      return res.status(200).json({ message: 'User deleted successfully' });
    }
    return res.status(404).json({ message: 'User not found.' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    next(error);
  }
};

module.exports = {
  addChatMessage,
  getAllChatMessages,
  getChatMessage,
  editNotification,
  deleteNotification,
};
