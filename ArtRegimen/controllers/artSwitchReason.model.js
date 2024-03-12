/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const ARTSwitchReason = require("../models/artSwitchReasons.model");


// using *Patients model
const addArtSwitchReason = async (req, res, next) => {
  console.log(req.body);
  try {
    const result = await ARTSwitchReason.create(req.body);

    res.json(result);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// get all priceListItems
const getAllArtSwitchReasons = async (req, res, next) => {
  try {
    const results = await ARTSwitchReason.findAll();
    res.json(results);
    next();
  } catch (error) {
    console.log(error);
    res.json({ error: 'Internal Server error' });
    next(error);
  }
};

const getArtSwitchReason = async (req, res, next) => {
  const { id } = req.params;
  try {
    const patient = await ARTSwitchReason.findOne({
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
const editArtSwitchReason = async (req, res, next) => {
  const { id } = req.params;
  const {
    first_name, middle_name, last_name, id_number, cell_phone,
  } = req.body;
  try {
    const editPAtient = await ARTSwitchReason.findOne({
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

const deleteArtSwitchReason = async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await ARTSwitchReason.destroy({
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
  addArtSwitchReason,
  getAllArtSwitchReasons,
  getArtSwitchReason,
  editArtSwitchReason,
  deleteArtSwitchReason,
};
