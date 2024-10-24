/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const Hospital = require('../models/hospital.model');

// using *Patients model
const addHospital = async (req, res, next) => {
  try {
    const newProfile = await Hospital.create(req.body);

    res.json(newProfile);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get all priceListItems
const getAllHospitals = async (req, res, next) => {
  try {
    const results = await Hospital.findAll({ });
    res.json(results);
    next();
  } catch (error) {
    console.log(error);
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

const getHospitalDetail = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await Hospital.findOne({
      where: {
        patient_id: id,
      },
    });
    res.json(results);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal Server Error' });
  }
};

// edit patient
const editHospital = async (req, res, next) => {
  const { id } = req.params;
  const {
    hospitalName, mflCode
  } = req.body;
  try {
    const editPAtient = await Hospital.findOne({
      where: {
        id,
      },
    });

    editPAtient.hospitalName = hospitalName;
    editPAtient.mflCode = mflCode;
    res.status(200).json(editPAtient)
    next();

    return editPAtient.save();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal Server' });
  }
};

const deleteHospital = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await Hospital.destroy({
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
  addHospital, getAllHospitals, getHospitalDetail, editHospital, deleteHospital,
};
