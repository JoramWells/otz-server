/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const moment = require('moment');
const { Op } = require('sequelize');
const Patient = require('../../models/patient/patients.models');
const TimeAndWork = require('../models/timeAndWork.model');
const Uptake = require('../models/uptake.model');

// using *Patients model
const addUptake = async (req, res, next) => {
  try {
    const newProfile = await Uptake.create(req.body);

    res.json(newProfile);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get all priceListItems
const getAllUptake = async (req, res, next) => {
  const { patientsDueMorning } = req.query;
  const currentDate = moment().format('YYYY-MM-DD');
  const currentTime = moment();
  const endMorningTime = moment('10.00.00', 'HH:mm');
  let whereCondition = {};
  let morningStatusWhereCondition = {};

  try {
    if (patientsDueMorning) {
      whereCondition = {
        morningTime: {
          [Op.between]: ['6:00:00', '9:00:00'],
        },
      };

      morningStatusWhereCondition = {
        morningStatus: false,
      };
    }
    const patients = await Uptake.findAll({
      where: {
        currentDate,
        morningStatus: morningStatusWhereCondition,
      },
      include: {
        where: whereCondition,
        model: TimeAndWork,
        attributes: ['id', 'morningTime', 'eveningTime'],
        include: {
          model: Patient,
          attributes: ['id', 'firstName', 'middleName'],
        },
      },
    });

    // if (due) {

    // }
    res.json(patients);
    next();
  } catch (error) {
    console.log(error);
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

const getUptake = async (req, res, next) => {
  const { id } = req.params;
  try {
    const patient = await Uptake.findOne({
      where: {
        id,
      },
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
const editUptake = async (req, res, next) => {
  const { id } = req.params;
  console.log(req.body);
  const {
    morningStatus,
  } = req.body;
  try {
    const results = await Uptake.findOne({
      where: {
        id,
      },
    });

    results.morningStatus = morningStatus;

    results.save();
    res.json(results);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal Server' });
    next(error);
  }
};

const deleteUptake = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await Uptake.destroy({
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
  addUptake,
  getAllUptake,
  getUptake,
  editUptake,
  deleteUptake,
};
