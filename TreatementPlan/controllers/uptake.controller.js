/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const Uptake = require('../models/uptake.model');

// using *Patients model
const addUptake = async (req, res, next) => {
  try {
    const newProfile = await Uptake.create(req.body);

    res.json(newProfile);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get all priceListItems
const getAllUptake = async (req, res, next) => {
  try {
    const patients = await Uptake.findAll();
    res.json(patients);
    next();
  } catch (error) {
    console.log(error);
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

const getUptake = async (req, res, next) => {
  const { id } = req.params;
  try {
    const patient = await Uptake.findOne({
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
const editUptake = async (req, res, next) => {
  const { id } = req.params;
  const {
    first_name, middle_name, last_name, id_number, cell_phone,
  } = req.body;
  try {
    const results = await Uptake.findOne({
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

const deleteUptake = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await Uptake.destroy({
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
  addUptake,
  getAllUptake,
  getUptake,
  editUptake,
  deleteUptake,
};
