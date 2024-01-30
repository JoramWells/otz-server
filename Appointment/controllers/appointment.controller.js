/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const Appointment = require('../models/appointment.model');
const Patient = require('../../Patient/models/patients.models');
const AppointmentAgenda = require('../models/appointmentAgenda.model');
const AppointmentStatus = require('../models/appointmentStatus.model');
const User = require('../../Users/models/user.models');

// using *Patients model
const addAppointment = async (req, res, next) => {
  try {
    const newProfile = await Appointment.create(req.body);

    res.json(newProfile);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get all priceListItems
const getAllAppointments = async (req, res, next) => {
  try {
    const results = await Appointment.findAll({
      include: [
        {
          model: Patient,
          attributes: ['firstName', 'middleName', 'dob'],
        },
        {
          model: User,
          attributes: ['firstName', 'middleName'],
        },
        {
          model: AppointmentAgenda,
          attributes: ['agendaDescription'],

        },
        {
          model: AppointmentStatus,
          attributes: ['statusDescription'],
        },
      ],
    });
    res.json(results);
    next();
  } catch (error) {
    // console.log(error);
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

const getAppointment = async (req, res, next) => {
  const { id } = req.params;
  try {
    const patient = await Appointment.findAll({
      where: {
        patientID: id,
      },
      include: [
        {
          model: AppointmentAgenda,
          attributes: ['agendaDescription'],
        },
        {
          model: AppointmentStatus,
          attributes: ['statusDescription'],
        },
        {
          model: User,
          attributes: ['firstName', 'middleName'],
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

// edit patient
const editAppointment = async (req, res, next) => {
  const { id } = req.params;
  const {
    first_name, middle_name, last_name, id_number, cell_phone,
  } = req.body;
  try {
    const editPAtient = await Appointment.findOne({
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

const deleteAppointment = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await Appointment.destroy({
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
  addAppointment,
  getAllAppointments,
  getAppointment,
  editAppointment,
  deleteAppointment,
};
