/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const County = require('../models/county.model');
const SubCounty = require('../models/subCounty.model');
const Ward = require('../models/ward.model');

// using *Patients model
const addWard = async (req, res, next) => {
  try {
    const newProfile = await Ward.create(req.body);

    res.json(newProfile);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get all priceListItems
const getAllWards = async (req, res, next) => {
  try {
    const results = await Ward.findAll({
      include: {
        model: SubCounty,
        attributes: ['id', 'subCountyName'],
      },
    });
    res.json(results);
    next();
  } catch (error) {
    console.log(error);
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

const getWardDetail = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await Ward.findOne({
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
const editWard = async (req, res, next) => {
  const { id } = req.params;
  const {
    first_name, middle_name, last_name, id_number, cell_phone,
  } = req.body;
  try {
    const editPAtient = await Ward.findOne({
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

const deleteWard = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await Ward.destroy({
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
  addWard,
  getAllWards,
  getWardDetail,
  editWard,
  deleteWard,
};
