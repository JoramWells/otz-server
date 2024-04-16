/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const twilio = require('twilio');
const schedule = require('node-schedule');

const { Op, Sequelize } = require('sequelize');
const SMSWhatsapp = require('../../models/smsWhatsapp.model');
const Appointment = require('../../models/appointment.model');
const Patient = require('../../models/patient/patients.models');
const User = require('../../models/users/user.models');
const AppointmentAgenda = require('../../models/appointmentAgenda.model');
const Chat = require('../../models/chats/chat.model');
require('dotenv').config();

// const twilioClient = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

// using *Patients model
const addChat = async (req, res, next) => {
  const [id1, id2] = req.body;
  try {
    const chatExists = Chat.findOne({
      members: [id1, id2],
    });

    if (chatExists) {
      res.json(chatExists);
      next();
    }

    const newProfile = await Chat.create(req.body);

    res.json(newProfile);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getChats = async (req, res, next) => {
  const { id } = req.params;

  console.log(id, 'id');
  try {
    const patient = await Chat.findAll({
      where: {
        members: {
          [Sequelize.Op.contains]: [id],
        },
      },
    });
    console.log(patient);
    res.json(patient);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal Server Error' });
    next(error);
  }
};

// get all priceListItems
const getChat = async (req, res, next) => {
  const { id1, id2 } = req.body;
  try {
    const chatExists = Chat.findAll({
      // members: [id1, id2],
    });

    res.json(chatExists);
    next();
  } catch (error) {
    console.log(error);
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

// edit patient
const editSMSWhatsapp = async (req, res, next) => {
  const { id } = req.params;
  const {
    first_name, middle_name, last_name, id_number, cell_phone,
  } = req.body;
  try {
    const editPAtient = await SMSWhatsapp.findOne({
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

const deleteSMSWhatsapp = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await SMSWhatsapp.destroy({
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
  addChat,
  getChat,
  getChats,
  editSMSWhatsapp,
  deleteSMSWhatsapp,
};
