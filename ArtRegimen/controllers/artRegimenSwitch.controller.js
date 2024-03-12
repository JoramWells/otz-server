/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const ARTRegimenSwitch = require("../models/artRegimenSwitch.model");



// using *Patients model
const addArtRegimenSwitch = async (req, res, next) => {
  console.log(req.body);
  try {
    const result = await ARTRegimenSwitch.create(req.body);

    res.json(result);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get all priceListItems
const getAllArtRegimenSwitch = async (req, res, next) => {
  try {
    const results = await ARTRegimenSwitch.findAll();
    res.json(results);
    next();
  } catch (error) {
    console.log(error);
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

const getArtRegimenSwitch = async (req, res, next) => {
  const { id } = req.params;
  try {
    const patient = await ARTRegimenSwitch.findOne({
      where: {
        cccno: id,
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
const editArtRegimenSwitch = async (req, res, next) => {
  const { id } = req.params;
  const {
    first_name, middle_name, last_name, id_number, cell_phone,
  } = req.body;
  try {
    const editPAtient = await ARTRegimenSwitch.findOne({
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

const deleteArtRegimenSwitch = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await ARTRegimenSwitch.destroy({
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
  addArtRegimenSwitch,
  getAllArtRegimenSwitch,
  getArtRegimenSwitch,
  editArtRegimenSwitch,
  deleteArtRegimenSwitch,
};
