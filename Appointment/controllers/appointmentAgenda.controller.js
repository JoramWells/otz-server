/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const AppointmentAgenda = require('../models/appointmentAgenda.model');
const Patient = require('../../models/patient/patients.models');

// using *Patients model
const addAppointmentAgenda = async (req, res, next) => {
  try {
    const newProfile = await AppointmentAgenda.create(req.body);

    res.json(newProfile);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get all priceListItems
const getAllAppointmentAgenda = async (req, res, next) => {
  try {
    const results = await AppointmentAgenda.findAll({ });
    res.json(results);
    next();
  } catch (error) {
    console.log(error);
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

const getAppointmentAgenda = async (req, res, next) => {
  const { id } = req.params;
  try {
    const patient = await AppointmentAgenda.findOne({
      where: {
        id,
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
const editAppointmentAgenda = async (req, res, next) => {
  const { id } = req.params;
  const {
    first_name, middle_name, last_name, id_number, cell_phone,
  } = req.body;
  try {
    const editPAtient = await AppointmentAgenda.findOne({
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

const deleteAppointmentAgenda = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await AppointmentAgenda.destroy({
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
  addAppointmentAgenda,
  getAllAppointmentAgenda,
  getAppointmentAgenda,
  editAppointmentAgenda,
  deleteAppointmentAgenda,
};
