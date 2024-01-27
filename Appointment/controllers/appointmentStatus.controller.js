/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const AppointmentStatus = require('../models/appointmentStatus.model');
const Patient = require('../../Patient/models/patients.models');

// using *Patients model
const addAppointmentStatus = async (req, res, next) => {
  try {
    const newProfile = await AppointmentStatus.create(req.body);

    res.json(newProfile);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

// get all priceListItems
const getAllAppointmentStatus = async (req, res, next) => {
  try {
    const results = await AppointmentStatus.findAll({});
    res.json(results);
    next();
  } catch (error) {
    console.log(error);
    res.json({error: 'Internal Server error'});
    next(error);
  }
};

const getAppointmentStatus = async (req, res, next) => {
  const {id} = req.params;
  try {
    const patient = await Art_regimen.findOne({
      where: {
        cccno: id,
      },
    });
    res.json(patient);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({message: 'Internal Server Error'});
  }
};

// edit patient
const editAppointmentStatus = async (req, res, next) => {
  const {id} = req.params;
  const {
    first_name, middle_name, last_name, id_number, cell_phone,
  } = req.body;
  try {
    const editPAtient = await Art_regimen.findOne({
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
    res.sendStatus(500).json({message: 'Internal Server'});
  }
};

const deleteAppointmentStatus = async (req, res, next) => {
  const {id} = req.params;
  try {
    const results = await Art_regimen.destroy({
      where: {
        patient_id: id,
      },
    });

    if (results) {
      return res.status(200).json({message: 'User deleted successfully'});
    }
    return res.status(404).json({message: 'User not found.'});
  } catch (error) {
    return res.status(500).json({message: 'Internal Server Error'});
  }
};

module.exports = {
  addAppointmentStatus, getAllAppointmentStatus, getAppointmentStatus,
  editAppointmentStatus, deleteAppointmentStatus,
};
