/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const redis = require('redis');
const Hospital = require('../../Hospital/models/hospital.model');
const Patient = require('../models/patients.models');
const School = require('../models/school.model');
const ViralLoad = require('../models/viralLoadTests.model');

const EXPIRY_DURATION = 60;
const PATIENT_KEY = 'patient';
// using *Patients model
const addPatient = async (req, res, next) => {
  try {
    const newProfile = await Patient.create(req.body);

    res.json(newProfile);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get all priceListItems
const getAllPatients = async (req, res, next) => {
  try {
    const redisClient = redis.createClient({ url: 'redis://redis:6379' });
    await redisClient.connect();

    if (await redisClient.get(PATIENT_KEY) === null) {
      const results = await Patient.findAll({
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: School,
            attributes: ['schoolName'],
          },
          {
            model: Hospital,
            attributes: ['hospitalName'],
          },
          {
            model: ViralLoad,
            attributes: ['id', 'dateOfNextVL', 'vlResults', 'isValid', 'dateOfCurrentVL'],
          },

        ],
      });
      console.log('Fetching from db...');
      res.json(results);

      console.log('Caching data to redis...');
      await redisClient.set(PATIENT_KEY, JSON.stringify(results));

      // invalidate cache
      await redisClient.expire(PATIENT_KEY, EXPIRY_DURATION).then(() => console.log('Expired cached'));
    } else {
      const cachedData = await redisClient.get(PATIENT_KEY);
      res.json(JSON.parse(cachedData));
      console.log('Fetching cached data from redis....');
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

const getPatientByID = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await Patient.findOne({
      where: {
        id,
      },
    });
    res.json(results);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal Server Error' });
  }
};

// edit patient
const editPatient = async (req, res, next) => {
  const { id } = req.params;
  const {
    first_name, middle_name, last_name, id_number, cell_phone,
  } = req.body;
  try {
    const editPAtient = await Patient.findOne({
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

const deletePatient = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await Patient.destroy({
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
  addPatient,
  getAllPatients,
  getPatientByID,
  editPatient,
  deletePatient,
};
