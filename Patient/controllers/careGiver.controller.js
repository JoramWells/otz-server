/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const CareGiver = require('../models/caregiver.model');
const Patient = require('../models/patients.models');

// using *Patients model
const addCaregiver = async (req, res, next) => {
  console.log(req.body);
  try {
    const newProfile = await CareGiver.create(req.body);

    res.json(newProfile);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get all priceListItems
const getAllCaregivers = async (req, res, next) => {
  try {
    const results = await CareGiver.findAll({
      include: [
        {
          model: Patient,
          attributes: ['firstName', 'middleName', 'dob', 'gender'],
        },
      ],
    });
    res.json(results);
    next();
  } catch (error) {
    console.log(error);
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

const getCaregiverDetail = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await CareGiver.findAll({
      where: {
        patientID: id,
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
const editCaregiver = async (req, res, next) => {
  const { id } = req.params;
  const {
    first_name, middle_name, last_name, id_number, cell_phone,
  } = req.body;
  try {
    const editPAtient = await CareGiver.findOne({
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

const deleteCaregiver = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await CareGiver.destroy({
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
  addCaregiver, getAllCaregivers, getCaregiverDetail, editCaregiver, deleteCaregiver,
};