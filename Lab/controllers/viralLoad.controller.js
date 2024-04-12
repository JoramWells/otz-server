/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const { Sequelize } = require('sequelize');
const ViralLoad = require('../models/lab/viralLoad.model');

// using *Patients model
const addViralLoad = async (req, res, next) => {
  try {
    const newProfile = await ViralLoad.create(req.body);

    res.json(newProfile);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get all priceListItems
const getAllViralLoads = async (req, res, next) => {
  try {
    const results = await ViralLoad.findAll();
    res.json(results);
    next();
  } catch (error) {
    console.log(error);
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

const getAllVlCategories = async (req, res, next) => {
  try {
    const results = await ViralLoad.findAll({
      attributes: [
        [Sequelize.literal(`CASE
      WHEN vlResults < 50 THEN 'LDL'
      WHEN vlResults BETWEEN 50 AND 199 THEN 'Low RiskLLV'
      WHEN vlResults BETWEEN 200 AND 999 THEN 'High Risk LLV'
      ELSE 'Suspected Treatment Failure'
      END`), 'category'],
        [Sequelize.fn('COUNT', Sequelize.col('*')), 'count'],
      ],
      group: 'category',
    });
    res.json(results);
  } catch (error) {
    console.log(error);
  }
};

const getViralLoad = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await ViralLoad.findAll({
      where: {
        patientID: id,
      },
      order: [['createdAt', 'DESC']],
    });
    res.json(results);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ message: 'Internal Server Error' });
  }
};

// edit patient
const editViralLoad = async (req, res, next) => {
  const { id } = req.params;
  const {
    first_name, middle_name, last_name, id_number, cell_phone,
  } = req.body;
  try {
    const editPAtient = await ViralLoad.findOne({
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

const deleteViralLoad = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await ViralLoad.destroy({
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
  addViralLoad,
  getAllViralLoads,
  getViralLoad,
  editViralLoad,
  deleteViralLoad,
  getAllVlCategories,
};
