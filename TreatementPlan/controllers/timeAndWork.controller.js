/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const MMAS = require('../models/mmas.model');
const Patient = require('../models/patient/patients.models');
const TimeAndWork = require('../models/timeAndWork.model');

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

// get all priceListItems
const getAllTimeAndWork = async (req, res, next) => {
  try {
    const patients = await TimeAndWork.findAll({
      include: [
        {
          model: Patient,
          attributes: ['id'],
        },
      ],
    });
    res.json(patients);
    next();
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
};
