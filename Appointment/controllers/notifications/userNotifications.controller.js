/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const UserNotifications = require('../../models/notify/userNotifications.model');

// using *Patients model
const addUserNotifications = async (req, res, next) => {
  console.log(req.body, 'ty');
  try {
    const results = await UserNotifications.create(req.body);

    res.json(results);
    next();
  } catch (error) {
    console.log(error);
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
    console.log(error);
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

const getUserNotifications = async (req, res, next) => {
  const { id } = req.params;
  try {
    const patient = await UserNotifications.findOne({
      where: {
        patientID: id,
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
const editUserNotifications = async (req, res, next) => {
  const { id } = req.params;
  const { notificationDescription } = req.body;
  console.log(req.body, 'kji');
  try {
    const results = await UserNotifications.findOne({
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
    console.log(error);
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
