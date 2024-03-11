/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const ART = require('../../domain/models/arts/art.model');
const ArtRegimenPhase = require('../../domain/models/arts/artRegimenPhases.model');
const OTZEnrollment = require('../../domain/models/otzEnrollment.model');
const Patient = require('../../domain/models/patients/patients.models');

// using *Patients model
const addOTZEnrollment = async (req, res, next) => {
  // console.log(req.body);
  try {
    const newProfile = await OTZEnrollment.create(req.body);

    res.json(newProfile);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
    next(error);
  }
};

// get all priceListItems
const getAllOTZEnrollment = async (req, res, next) => {
  try {
    const results = await OTZEnrollment.findAll({
      include: [
        {
          model: Patient,
          attributes: ['firstName', 'middleName', 'dob', 'gender'],
        },
        {
          model: ART,
          attributes: ['artName'],
        },
        {
          model: ArtRegimenPhase,
          attributes: ['artPhaseDescription']
        }
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

const getOTZEnrollment = async (req, res, next) => {
  const { id } = req.params;
  try {
    const patient = await OTZEnrollment.findOne({
      where: {
        id,
      },
      include: [
        {
          model: ART,
          attributes: ['artName'],
        },
      ],
    });
    res.json(patient);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal Server Error' });
  }
};

// get user enrollment
const getOTZPatientEnrollmentDetails = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const results = await OTZEnrollment.findOne({
      where: {
        patientID: id,
      },
      // include: [
      //   {
      //     model: ART,
      //     attributes: ['artName'],
      //   },
      // ],
    });
    res.json(results);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal Server Error' });
    next(error);
  }
};

// edit patient
const editOTZEnrollment = async (req, res, next) => {
  const { id } = req.params;
  const {
    first_name, middle_name, last_name, id_number, cell_phone,
  } = req.body;
  try {
    const editPAtient = await OTZEnrollment.findOne({
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

const deleteOTZEnrollment = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await OTZEnrollment.destroy({
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
  addOTZEnrollment,
  getAllOTZEnrollment,
  getOTZEnrollment,
  editOTZEnrollment,
  deleteOTZEnrollment,
  getOTZPatientEnrollmentDetails,
};
