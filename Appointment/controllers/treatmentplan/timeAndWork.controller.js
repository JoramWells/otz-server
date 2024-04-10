/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const moment = require('moment');
const { Op } = require('sequelize');
const Patient = require('../../models/patient/patients.models');
const TimeAndWork = require('../../models/treatmentplan/timeAndWork.model');
const Uptake = require('../../models/treatmentplan/uptake.model');

// using *Patients model
const addTimeAndWork = async (req, res, next) => {
  try {
    const newProfile = await TimeAndWork.create(req.body);

    res.json(newProfile);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//
const scheduleDailyTask = async (taskFunction) => {
  const now = moment();
  const tomorrow = moment().add(1, 'day').startOf('day');
  const delay = tomorrow.diff(now);

  setTimeout(() => {
    taskFunction();
    setInterval(taskFunction, 24 * 60 * 60 * 1000);
  }, delay);
};

// scedule
// scheduleDailyTask(createDailyUptake);

// get all priceListItems
const getAllTimeAndWork = async (req, res, next) => {
  const { medicationsDue } = req.query;
  console.log(req.query);
  const currentTime = moment();
  const duePatients = [];
  try {
    // Get current date
    const currentDate = moment().format('YYYY-MM-DD');

    // results.forEach(async (results) => {
    //   await Uptake.create({
    //     patientID: results.patientID,
    //   });
    // });

    const patients = await TimeAndWork.findAll({
      // where: {
      //   [Op.between]: [new Date(), new Date().setDate(new Date().getDate() + 1)],
      // },
      include: [
        {
          model: Patient,
          attributes: ['id', 'firstName'],
        },
      ],
    });

    const todaysUptake = await Uptake.findAll({
      include: [{
        model: TimeAndWork,
        attributes: ['morningMedicineTime'],
      }],
    });
    if (medicationsDue) {
      todaysUptake.forEach(async (uptake) => {
        const morningTime = moment(uptake.morningTime, 'HH:mm');
        const eveningTime = moment(uptake.eveningTime, 'HH:mm');
      });
    }

    res.json(patients);
    next();

    // if (medicationsDue) {
    //   patients.forEach(async (time) => {
    //     const morningTime = moment(time.morningTime, 'HH:mm');
    //     const eveningTime = moment(time.eveningTime, 'HH:mm');

    //     if (currentTime.isSameOrAfter(morningTime) && currentTime.isBefore(eveningTime)) {
    //       duePatients.push({
    //         patientID: time.patientID,
    //         firstName: time.patient.firstName,

    //       });
    //     }
    //   });
    //   res.json(duePatients);
    //   next();
    // } else {
    //   res.json(patients);
    //   next();
    // }
  } catch (error) {
    console.log(error);
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

const getTimeAndWork = async (req, res, next) => {
  const { id } = req.params;
  try {
    const patient = await TimeAndWork.findAll({
      where: {
        patientID: id,
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
const editTimeAndWork = async (req, res, next) => {
  const { id } = req.params;
  const {
    first_name, middle_name, last_name, id_number, cell_phone,
  } = req.body;
  try {
    const results = await TimeAndWork.findOne({
      where: {
        patient_id: id,
      },
    });

    results.first_name = first_name;
    results.middle_name = middle_name;
    results.last_name = last_name;
    results.id_number = id_number;
    results.cell_phone = cell_phone;
    next();

    return results.save();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal Server' });
  }
};

const deleteTimeAndWork = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await TimeAndWork.destroy({
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
  addTimeAndWork,
  getAllTimeAndWork,
  getTimeAndWork,
  editTimeAndWork,
  deleteTimeAndWork,
  //
  scheduleDailyTask,
};
