/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const ViralLoad = require('../models/viralLoad.model');
const VitalSign = require('../../VitalSigns/models/vitalSigns.model');
const Patient = require('../../Patient/models/patients.models');
const ART = require('../../ArtRegimen/models/artDetails.model');

// using *Patients model
const addViralLoad = async (req, res, next) => {
  try {
    const newProfile = await Patient.create(req.body);

    res.json(newProfile);
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
};

// get all priceListItems
const getAllViralLoads = async (req, res, next) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
    next();
  } catch (error) {
    console.log(error);
    res.json({error: 'Internal Server error'});
    next(error);
  }
};

const getViralLoad = async (req, res, next) => {
  const {id} = req.params;
  try {
    const patient = await Patient.findOne({
      where: {
        cccno: id,
      },
      include: [
        {
          model: VitalSign,
          attributes: ['height', 'weight', 'bp'],
        },
        {
          model: ViralLoad,
          attributes: ['vl_result', 'vl_validity',
            'vl_justification', 'last_vl_date'],
        },

        {
          model: ART,
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
const editViralLoad = async (req, res, next) => {
  const {id} = req.params;
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
    res.sendStatus(500).json({message: 'Internal Server'});
  }
};

const deleteViralLoad = async (req, res, next) => {
  const {id} = req.params;
  try {
    const results = await Patient.destroy({
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
  addViralLoad, getAllViralLoads, getViralLoad, editViralLoad, deleteViralLoad,
};
