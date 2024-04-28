/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const redis = require('redis');
const County = require('../models/county.model');

// using *Patients model
const addCounty = async (req, res, next) => {
  try {
    const newProfile = await County.create(req.body);

    res.json(newProfile);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get all priceListItems
const getAllCounties = async (req, res, next) => {
  const redisKey = 'redisData';
  const expiryDuration = 60;
  try {
    // /define redis client
    // const redisClient = redis.createClient({ url: 'redis://redis:6379' });
    // await redisClient.connect();
    const results = await County.findAll();

    res.json(results);
    // if (await redisClient.get(redisKey) === null) {
    //   const results = await County.findAll();
    //   console.log('Fetching from db');

    //   await redisClient.set(redisKey, JSON.stringify(results));

    //   res.json(results);
    // } else {
    //   const cachedData = await redisClient.get(redisKey);
    //   res.json(JSON.parse(cachedData));
    //   console.log('Cached');

    //   // invalidate cace
    //   redisClient.expire(redisKey, expiryDuration);
    // }

    next();
  } catch (error) {
    console.log(error);
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

const getCountyDetail = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await County.findOne({
      where: {
        cccno: id,
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
const editCounty = async (req, res, next) => {
  const { id } = req.params;
  const {
    first_name, middle_name, last_name, id_number, cell_phone,
  } = req.body;
  try {
    const editPAtient = await County.findOne({
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

const deleteCounty = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await County.destroy({
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
  addCounty,
  getAllCounties,
  getCountyDetail,
  editCounty,
  deleteCounty,
};
