/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// const Patient = require('../../Location/models/patients.models');
const moment = require('moment');
const Pill = require('../models/pill/pill.model');
const Patient = require('../models/patient/patients.models');
const ART = require('../models/art.model');
const TimeAndWork = require('../models/treatmentplan/timeAndWork.model');

// setup server
const app = express();
const server = http.createServer(app);

// setup io
const io = socketIO(server);

// // check connection
// io.on('connection', (socket)=>{
//   console.log('Connected to IO sever')
// })
// using *Patients model
const addPills = async (req, res, next) => {
  try {
    const newProfile = await Pill.create(req.body);

    res.json(newProfile);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const currentTime = moment();

const dueMedication = async (req, res, next) => {
  try {
    const scheduledTimes = await TimeAndWork.findAll({});

    scheduledTimes.forEach(async (time) => {
      const morningTime = moment(time.morningTime, 'HH:mm'); // Parse morning time
      const eveningTime = moment(time.eveningTime, 'HH:mm'); // Parse evening time

      if (currentTime.isBetween(morningTime, eveningTime)) {
        const results = await Pill.findAll({
          where: {

          },
        });
      }
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// get all priceListItems
const getAllPills = async (req, res, next) => {
  try {
    const results = await Pill.findAll({
      include: [
        {
          model: Patient,
          attributes: ['id', 'firstName', 'middleName'],
          // include: [
          //   {
          //     model: TimeAndWork,
          //     attributes: ['id', 'morningTime', 'eveningTime'],
          //   },
          // ],
        },
        {
          model: ART,
          attributes: ['id', 'artName'],
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

const getPill = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await Pill.findOne({
      where: {
        id,
      },
      // order: [['createdAt', 'DESC']],
      // include: [
      //   {
      //     model: Patient,
      //     attributes: ['firstName', 'middleName'],
      //   },
      // ],
    });
    res.json(results);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal Server Error' });
  }
};

// edit patient
const editPill = async (req, res, next) => {
  const { id } = req.params;
  try {
    const labResults = await Pill.findOne({
      where: {
        id,
      },
    });

    labResults.results = req.body.results;
    labResults.save();
    req.app.locals.io.emit('lab-updated', labResults);

    res.status(200).json(labResults);
    next();
    return true;
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal Server' });
    next(error);
  }
};

const deletePill = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await Pill.destroy({
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
  addPills,
  getAllPills,
  getPill,
  editPill,
  deletePill,
};
