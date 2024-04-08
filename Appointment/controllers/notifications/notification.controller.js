/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const Notification = require('../../models/notify/notification.models');
const NotificationCategory = require('../../models/notify/notificationCategory.model');
const NotificationSubCategory = require('../../models/notify/notificationSubCategory.model');

// using *Patients model
const addNotification = async (req, res, next) => {
  try {
    const results = await Notification.create(req.body);

    res.json(results);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};

// get all priceListItems
const getAllNotifications = async (req, res, next) => {
  try {
    const results = await Notification.findAll({
      include: [
        {
          model: NotificationSubCategory,
          attributes: ['id', 'notificationSubCategoryName'],
          include: [
            {
              model: NotificationCategory,
              attributes: ['id', 'notificationDescription'],
            },
          ],
        },
      ],
    });
    res.json(results);
    next();
  } catch (error) {
    console.log(error);
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

const getNotification = async (req, res, next) => {
  const { id } = req.params;
  try {
    const patient = await Notification.findOne({
      where: {
        id,
      },
    });
    res.json(patient);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal Server Error' });
  }
};

// edit patient
const editNotification = async (req, res, next) => {
  const { id } = req.params;
  const { notificationDescription } = req.body;
  console.log(req.body, 'kji');
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
    console.log(error);
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
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
    next(error);
  }
};

module.exports = {
  addNotification,
  getAllNotifications,
  getNotification,
  editNotification,
  deleteNotification,
};
