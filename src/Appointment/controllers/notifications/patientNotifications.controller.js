/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const moment = require('moment-timezone');
const { scheduleJob } = require('node-schedule');
const PatientNotification = require('../../models/notify/patientNotifications.model');
const Patient = require('../../models/patient/patients.models');
const TimeAndWork = require('../../models/treatmentplan/timeAndWork.model');
const Uptake = require('../../models/treatmentplan/uptake.model');
const UserNotifications = require('../../models/notify/userNotifications.model');
// using *Patients model
const addPatientNotifications = async (req, res, next) => {
  try {
    const results = await PatientNotification.create(req.body);

    res.json(results);
    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};
// get all priceListItems
const getAllPatientNotifications = async (req, res, next) => {
  const currentDate = moment().tz('Africa/Nairobi').format('YYYY-MM-DD');
  try {
    const results = await PatientNotification.findAll({
      // where: {
      //   updatedAt: currentDate,
      // },
      include: [
        {
          model: Patient,
          attributes: ['id', 'firstName', 'middleName'],
          // include:
          //   {
          //     model: UserNotifications,
          //     attributes: ['notifications'],
          //   },

        },
      ],
    });

    res.json(results);
    next();
  } catch (error) {
    res.json({ error: 'Internal Server error' });
    console.log(error);
    next(error);
  }
};

const getPatientNotifications = async (req, res, next) => {
  const { id } = req.params;
  try {
    const patient = await PatientNotification.findAll({
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
const editPatientNotifications = async (req, res, next) => {
  const { id } = req.params;
  console.log(req.body);
  const { notifications, notificationID } = req.body;
  try {
    const results = await PatientNotification.findOne({
      where: {
        id,
      },
    });
    results.notifications = notifications;
    results.save();
    res.sendStatus(200);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal Server' });
    next(error);
  }
};

const deletePatientNotifications = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await PatientNotification.destroy({
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
  addPatientNotifications,
  getAllPatientNotifications,
  getPatientNotifications,
  editPatientNotifications,
  deletePatientNotifications,
};