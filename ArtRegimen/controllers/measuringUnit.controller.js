/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const MeasuringUnit = require('../models/measuringUnit.model');

// using *Patients model
const addMeasuringUnit = async (req, res, next) => {
  console.log(req.body);
  try {
    const result = await MeasuringUnit.create(req.body);

    res.json(result);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get all priceListItems
const getAllMeasuringUnit = async (req, res, next) => {
  try {
    const results = await MeasuringUnit.findAll();
    res.json(results);
    next();
  } catch (error) {
    console.log(error);
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

const getMeasuringUnit = async (req, res, next) => {
  const { id } = req.params;
  try {
    const patient = await MeasuringUnit.findAll({
      order: [['updatedAt', 'DESC']],
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
const editMeasuringUnit = async (req, res, next) => {
  const { id } = req.params;

  try {
    const results = await MeasuringUnit.findOne({
      where: {
        id,
      },
    });

    results.description = req.body.description;

    next();

    return results.save();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal Server' });
  }
};

const deleteMeasuringUnit = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await MeasuringUnit.destroy({
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
  addMeasuringUnit,
  getAllMeasuringUnit,
  getMeasuringUnit,
  editMeasuringUnit,
  deleteMeasuringUnit,
};
