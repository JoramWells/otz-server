/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const redis = require('redis');
const moment = require('moment');
const { Sequelize, Op } = require('sequelize');
const Appointment = require('../models/appointment.model');
const Patient = require('../models/patient/patients.models');
const AppointmentAgenda = require('../models/appointmentAgenda.model');
const AppointmentStatus = require('../models/appointmentStatus.model');
const User = require('../models/users/user.models');

const expiryDuration = 60;
// let client;

// (async()=> client = await redis.createClient()
// .on('error', err => console.log(err)).connect())
// client.connect().then(async(res)=>{
//   console.log('connected',res)
// }).catch(err=>console.log(err))

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
  const { date, mode } = req.query;
  console.log(mode === 'weekly', 'body');
  let startDate;
  let endDate;
  const whereCondition = {};

  const appointmentKey = 'appointmentData';
  try {
    if (mode === 'daily') {
      startDate = new Date(date);
      endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      whereCondition.appointmentDate = {
        [Op.between]: [startDate, endDate],
      };
    } else if (mode === 'weekly') {
      startDate = moment().startOf('week').toDate();
      endDate = moment().endOf('week').toDate();
      whereCondition.appointmentDate = {
        [Op.between]: [startDate, endDate],
      };
    }

    const client = redis.createClient({ url: 'redis://redis:6379' });
    await client.connect();

    //
    if (await client.get(appointmentKey) === null) {
      // get all
      const results = await Appointment.findAll({
        order: [['appointmentDate', 'ASC']],
        where: whereCondition,
        include: [
          {
            model: Patient,
            attributes: ['firstName', 'middleName', 'dob', 'sex'],
          },
          {
            model: User,
            attributes: ['id', 'firstName', 'middleName'],
          },
          {
            model: AppointmentAgenda,
            attributes: ['id', 'agendaDescription'],

          },
          {
            model: AppointmentStatus,
            attributes: ['id', 'statusDescription'],
          },
        ],
      });

      console.log('Fetching from db');

      await client.set('appointmentData', JSON.stringify(results));
      res.json(results);
      next();
    } else {
      const cachedData = await client.get(appointmentKey);
      res.json(JSON.parse(cachedData));
      console.log('Cached');

      // invalidate cace
      client.expire(appointmentKey, expiryDuration);

      next();
    }
    // console.log('not connected')
    // console.log(await client.get('jay', redis.print))

    // await client.connect();
    // res.json(results);
    // next();
  } catch (error) {
    console.log(error);
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

//

const checkAppointment = async () => {
  try {
    const patients = await Patient.findAll();

    //
    for (const patient of patients) {
      // const vlDate
      console.log(patient);
    }
  } catch (error) {
    console.log(error);
  }
};

//
const getWeeklyAppointments = async (req, res, next) => {
  try {
    const startDate = moment().startOf('week').toDate();
    const endDate = moment().endOf('week').toDate();

    const appointments = await Appointment.findAll({
      where: {
        appointmentDate: {
          [Op.between]: [startDate, endDate],
        },
      },
    });

    res.json(appointments);
  } catch (error) {
    console.log(error);
  }
};

const getAppointmentDetail = async (req, res, next) => {
  const { id } = req.params;
  try {
    const patient = await Appointment.findOne({
      where: {
        id,
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

const getAppointment = async (req, res, next) => {
  const { id } = req.params;
  try {
    const patient = await Appointment.findAll({
      where: {
        id,
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
    next(error);
  }
};

// edit patient
const editAppointment = async (req, res, next) => {
  const appointmentKey = 'appointmentData';

  const client = redis.createClient({ url: 'redis://redis:6379' });
  await client.connect();

  const { id } = req.params;
  const {
    userID, appointmentAgendaID, appointmentStatusID,
  } = req.body;
  try {
    // redis
    if (await client.get(appointmentKey)) {
      await client.del(appointmentKey);
      console.log('deleted appointment cache');
    }

    const results = await Appointment.findOne({
      where: {
        id,
      },
      // returning:true
    });

    results.userID = userID;
    results.appointmentAgendaID = appointmentAgendaID;
    results.appointmentStatusID = appointmentStatusID;
    // results.id_number = id_number;
    // results.cell_phone = cell_phone;

    await results.save();

    if (results) {
      const results2 = await Appointment.findAll({
        order: [['appointmentDate', 'ASC']],
        include: [
          {
            model: Patient,
            attributes: ['firstName', 'middleName', 'dob', 'sex'],
          },
          {
            model: User,
            attributes: ['id', 'firstName', 'middleName'],
          },
          {
            model: AppointmentAgenda,
            attributes: ['id', 'agendaDescription'],

          },
          {
            model: AppointmentStatus,
            attributes: ['id', 'statusDescription'],
          },
        ],
      });
      // await client.set(appointmentKey, JSON.stringify(results2))
      // const daty = await client.get(JSON.parse(appointmentKey))

      // invalidate redis cache

      // emit event
      req.app.locals.io.emit('appointment-updated', []);
    }
    // console.log(results.status, 'fgt');
    res.status(200);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal Server' });
    next(error);
  }
};

const deleteAppointment = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await Appointment.destroy({
      where: {
        id,
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
  getAppointmentDetail,
  getWeeklyAppointments,
};
