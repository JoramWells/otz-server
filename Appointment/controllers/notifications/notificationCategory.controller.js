/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const NotificationCategory = require('../../models/notify/notificationCategory.model');

// using *Patients model
const addNotificationCategory = async (req, res, next) => {
  try {
    const results = await NotificationCategory.create(req.body);

    res.json(results);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};

// get all priceListItems
const getAllNotificationCategories = async (req, res, next) => {
  try {
    const results = await NotificationCategory.findAll({});
    res.json(results);
    next();
  } catch (error) {
    console.log(error);
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

const getNotificationCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const patient = await NotificationCategory.findOne({
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
const editNotificationCategory = async (req, res, next) => {
  const { id } = req.params;
  const {
    first_name, middle_name, last_name, id_number, cell_phone,
  } = req.body;
  try {
    const editPAtient = await NotificationCategory.findOne({
      where: {
        patient_id: id,
      },
    });

    editPAtient.first_name = first_name;
    editPAtient.middle_name = middle_name;
    editPAtient.last_name = last_name;
    editPAtient.id_number = id_number;
    editPAtient.cell_phone = cell_phone;
    next();

    return editPAtient.save();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal Server' });
  }
};

const deleteNotificationCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await NotificationCategory.destroy({
      where: {
        patient_id: id,
      },
    });

    if (results) {
      return res.status(200).json({ message: 'User deleted successfully' });
    }
    return res.status(404).json({ message: 'User not found.' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  addNotificationCategory,
  getAllNotificationCategories,
  getNotificationCategory,
  editNotificationCategory,
  deleteNotificationCategory,
};
