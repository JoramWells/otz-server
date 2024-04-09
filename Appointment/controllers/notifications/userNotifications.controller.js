/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const UserNotifications = require('../../models/notify/userNotifications.model');

// using *Patients model
const addUserNotifications = async (req, res, next) => {
  try {
    const results = await UserNotifications.create(req.body);

    res.json(results);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};
// get all priceListItems
const getAllUserNotifications = async (req, res, next) => {
  try {
    const results = await UserNotifications.findAll({
    });
    res.json(results);
    next();
  } catch (error) {
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

const getUserNotifications = async (req, res, next) => {
  const { id } = req.params;
  try {
    const patient = await UserNotifications.findAll({
      where: {
        patientID: id,
      },
    });
    res.json(patient);
    next();
  } catch (error) {
    // console.log(error);
    res.sendStatus(500).json({ message: 'Internal Server Error' });
    next(error);
  }
};


// edit patient
const editUserNotifications = async (req, res, next) => {
  const { id } = req.params;
  console.log(req.body)
  const { notifications, notificationID } = req.body;
  try {
    const results = await UserNotifications.findOne({
      where: {
        id,
      },
    });
    results.notifications = notifications;
    results.save();

    next();
  } catch (error) {
    console.log(error)
    res.sendStatus(500).json({ message: 'Internal Server' });
    next(error);
  }
};

const deleteUserNotifications = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await UserNotifications.destroy({
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
  addUserNotifications,
  getAllUserNotifications,
  getUserNotifications,
  editUserNotifications,
  deleteUserNotifications,
};
