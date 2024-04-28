/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const NotificationCategory = require('../../models/notify/notificationCategory.model');
const NotificationSubCategory = require('../../models/notify/notificationSubCategory.model');

// using *Patients model
const addNotificationSubCategory = async (req, res, next) => {
  try {
    const results = await NotificationSubCategory.create(req.body);

    res.json(results);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};

// get all priceListItems
const getAllNotificationSubCategories = async (req, res, next) => {
  try {
    const results = await NotificationSubCategory.findAll({
      include: [
        {
          model: NotificationCategory,
          attributes: ['id', 'notificationDescription'],
        },
      ],
    });
    res.json(results);
    next();
  } catch (error) {
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

const getNotificationSubCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const patient = await NotificationSubCategory.findOne({
      where: {
        id,
      },
    });
    res.json(patient);
    next();
  } catch (error) {
    res.sendStatus(500).json({ message: 'Internal Server Error' });
  }
};

// edit patient
const editNotificationSubCategory = async (req, res, next) => {
  const { id } = req.params;
  const { notificationDescription } = req.body;
  try {
    const results = await NotificationSubCategory.findOne({
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

const deleteNotificationSubCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await NotificationSubCategory.destroy({
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
  addNotificationSubCategory,
  getAllNotificationSubCategories,
  getNotificationSubCategory,
  editNotificationSubCategory,
  deleteNotificationSubCategory,
};
