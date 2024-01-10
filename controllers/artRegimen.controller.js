/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */

const Art_regimen = require('../models/artRegimens.model');
const Patient = require('../models/patients.models');


// using *Patients model
const addArtRegimen = async (req, res, next) => {
  try {
    const newProfile = await Art_regimen.create(req.body);

    res.json(newProfile);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

// get all priceListItems
const getAllArtRegimen = async (req, res, next) => {
  try {
    const patients = await Art_regimen.findAll();
    res.json(patients);
    next();
  } catch (error) {
    console.log(error);
    res.json({error: 'Internal Server error'});
    next(error);
  }
};

const getArtRegimen = async (req, res, next) => {
  const {id} = req.params;
  try {
    const patient = await Patient.findOne({
      where: {
        cccno: id,
      },
      include: [
        {
          model: Art_regimen,
          attributes: ['first_regimen', 'current_regimen',
            'current_regimen_line', 'latest_cd4_count',
          ],
        },
      ],
    });
    res.json(patient);
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({message: 'Internal Server Error'});
  }
};

// edit patient
const editArtRegimen = async (req, res, next) => {
  const {id} = req.params;
  const {
    first_name, middle_name, last_name, id_number, cell_phone,
  } = req.body;
  try {
    const editPAtient = await Art_regimen.findOne({
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
    res.sendStatus(500).json({message: 'Internal Server'});
  }
};

const deleteArtRegimen = async (req, res, next) => {
  const {id} = req.params;
  try {
    const results = await Art_regimen.destroy({
      where: {
        patient_id: id,
      },
    });

    if (results) {
      return res.status(200).json({message: 'User deleted successfully'});
    }
    return res.status(404).json({message: 'User not found.'});
  } catch (error) {
    return res.status(500).json({message: 'Internal Server Error'});
  }
};

module.exports = {
  addArtRegimen, getAllArtRegimen, getArtRegimen,
  editArtRegimen, deleteArtRegimen,
};
