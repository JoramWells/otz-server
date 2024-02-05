/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const Patient = require('../../Patient/models/patients.models');
const ART = require('../models/art.model');
const ARTPrescription = require('../models/artPrescription.model');

// using *Patients model
const addRegimenPrescription = async (req, res, next) => {
  try {
    const newProfile = await ARTPrescription.create(req.body);

    res.json(newProfile);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get all priceListItems
const getAllRegimenPrescription = async (req, res, next) => {
  try {
    const results = await ARTPrescription.findAll({
      order: [['DESC', 'createdAt']],
    });
    res.json(results);
    next();
  } catch (error) {
    console.log(error);
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

const getRegimenPrescription = async (req, res, next) => {
  const { id } = req.params;
  try {
    const patient = await ARTPrescription.findAll({
      where: {
        patientID: id,
      },
      include: [
        {
          model: ART,
          attributes: ['artName'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.json(patient);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal Server Error' });
  }
};

// edit patient
const editRegimenPrescription = async (req, res, next) => {
  const { id } = req.params;
  const {
    first_name, middle_name, last_name, id_number, cell_phone,
  } = req.body;
  try {
    const editPAtient = await ARTPrescription.findOne({
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

const deleteRegimenPrescription = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await ARTPrescription.destroy({
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
  addRegimenPrescription,
  getAllRegimenPrescription,
  getRegimenPrescription,
  editRegimenPrescription,
  deleteRegimenPrescription,
};
