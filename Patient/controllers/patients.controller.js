/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const Patient = require('../models/patients.models');
const ViralLoad = require('../../ViralLoad/models/viralLoad.model');
const VitalSign = require('../../VitalSigns/models/vitalSigns.model');

// using *Patients model
const addPatients = async (req, res, next) => {
  try {
    const newProfile = await Patient.create(req.body);

    res.json(newProfile);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get all priceListItems
const getAllPatients = async (req, res, next) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
    next();
  } catch (error) {
    console.log(error);
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

const getPatientDetail = async (req, res, next) => {
  const { id } = req.params;
  try {
    const patient = await Patient.findOne({
      where: {
        patient_id: id,
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
const editPatient = async (req, res, next) => {
  const { id } = req.params;
  const {
    first_name, middle_name, last_name, id_number, cell_phone,
  } = req.body;
  try {
    const editPAtient = await Patient.findOne({
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

const deletePatient = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await Patient.destroy({
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
  addPatients, getAllPatients, getPatientDetail, editPatient, deletePatient,
};
