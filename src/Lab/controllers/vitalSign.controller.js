/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const VitalSign = require('../models/vitalSigns.model');

// using *Patients model
const addVitalSign = async (req, res, next) => {
  try {
    const newProfile = await VitalSign.create(req.body);

    res.json(newProfile);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get all priceListItems
const getAllVitalSigns = async (req, res, next) => {
  try {
    const patients = await VitalSign.findAll();
    res.json(patients);
    next();
  } catch (error) {
    console.log(error);
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

const getVitalSignByPatientID = async (req, res, next) => {
  const { id } = req.params;
  if(id ==='undefined') return null;
  try {
    const patient = await VitalSign.findOne({
      order:[['updatedAt', 'DESC']],
      where: {
        patientID: id,
      },
    });
    res.status(200).json(patient);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
    next(error);
  }
};

const getAllVitalSignByPatientID = async (req, res, next) => {
  const { id } = req.params;
  if(id==='undefined') return null;
  try {
    const patient = await VitalSign.findAll({
      order: [['updatedAt', 'DESC']],
      where: {
        patientID: id,
      },
    });
    res.status(200).json(patient);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
    next(error);
  }
};

const getVitalSignDetail = async (req, res, next) => {
  const { id } = req.params;
  if(id === 'undefined') return null;
  try {
    const patient = await VitalSign.findOne({
      where: {
        patientVisitID: id,
      },
    });
    res.status(200).json(patient);
    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    next(error);
  }
};

// 
const getAllVitalSignDetail = async (req, res, next) => {
  const { id } = req.params;
  if(id === 'undefined') return null;
  try {
    const patient = await VitalSign.findAll({
      where: {
        patientVisitID: id,
      },
    });
    res.status(200).json(patient);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
    next(error);
  }
};

// edit patient
const editVitalSign = async (req, res, next) => {
  const { id } = req.params;
  const {
    first_name, middle_name, last_name, id_number, cell_phone,
  } = req.body;
  try {
    const editPAtient = await VitalSign.findOne({
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

const deleteVitalSign = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await VitalSign.destroy({
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
  addVitalSign,
  getAllVitalSigns,
  getVitalSignDetail,
  editVitalSign,
  deleteVitalSign,
  getVitalSignByPatientID,
  getAllVitalSignDetail,
  getAllVitalSignByPatientID
};
